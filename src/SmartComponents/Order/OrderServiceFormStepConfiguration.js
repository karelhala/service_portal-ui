import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Bullseye, Radio, Form, Title, Stack, StackItem } from '@patternfly/react-core';
import '../../Utilities/jschema.scss';
import { fetchServicePlans, sendSubmitOrder } from '../../redux/Actions/OrderActions';
import FormRenderer from '../Common/FormRenderer';
import { fetchProviderControlParameters } from '../../Helpers/Portfolio/PortfolioHelper';

class OrderServiceFormStepConfiguration extends React.Component {
  state = {
    showOrder: false,
    selectedPlanIdx: 0,
    controlParametersLoaded: false
  };

  optionRow = (plan, option, selectedId, onChange) =>
    <Radio id={ plan.id }
      key={ plan.id }
      value={ plan.id }
      checked={ selectedId === plan.id }
      name={ plan.name }
      aria-label={ plan.description }
      onChange={ onChange }
      label={ plan.description } />;

  componentDidMount() {
    const { id } = this.props;
    this.props.fetchPlans(id);
    fetchProviderControlParameters(id).then(providerControlParameters => this.setState({ providerControlParameters, controlParametersLoaded: true }));
  }

  handlePlanChange = (arg, event) =>  {
    const planId = event.currentTarget.value;
    this.setState({ selectedPlanIdx: this.props.servicePlans.findIndex(plan=> plan.id === planId) });
  };

  planOptions = () => {
    let selectedId = this.props.servicePlans[this.state.selectedPlanIdx].id;
    let onChange = this.handlePlanChange;

    return this.props.servicePlans.map((plan, option) => this.optionRow(plan, option, selectedId, onChange));
  }

  onSubmit = (data) => {
    const portfolioItemId = this.props.id;
    const service_plan_id = this.props.servicePlans[this.state.selectedPlanIdx].id;
    this.props.sendSubmitOrder({ portfolio_item_id: portfolioItemId, service_plan_ref: service_plan_id, service_parameters: data });
    this.props.history.push(this.props.closeUrl);
  };

  render() {
    const { controlParametersLoaded, providerControlParameters } = this.state;
    if (!this.props.isLoading && controlParametersLoaded) {
      const initialSchema = { ...this.props.servicePlans[this.state.selectedPlanIdx].create_json_schema };
      const formSchema = {
        ...initialSchema,
        properties: { providerControlParameters, ...initialSchema.properties  }
      };
      return (
        <React.Fragment>
          <Stack gutter={ 'md' } className="order_card">
            <StackItem>
              <Title size={ 'lg' } > Configuration </Title>
            </StackItem>
            <StackItem>
              <Form>
                { (this.props.servicePlans.length > 1) &&
                        <div>
                          <Title size={ 'md' }>Select Plan:</Title>
                          <div>{ this.planOptions() }</div>
                        </div>
                }
              </Form>
              { (!this.props.isLoading && this.props.servicePlans.length > 0) &&
                  <FormRenderer
                    schema={ formSchema }
                    onSubmit={ this.onSubmit }
                    schemaType="mozilla"
                    formContainer="modal"
                  />
              }
            </StackItem>
          </Stack>
        </React.Fragment>
      );
    }

    return (
      <Form>
        <Bullseye>
          <div>
            { this.props.isLoading && (<span color={ '#00b9e4' }> Loading...</span>) }
          </div>
        </Bullseye>
      </Form>
    );
  }
}

OrderServiceFormStepConfiguration.propTypes = {
  orderData: PropTypes.func,
  fetchPlans: PropTypes.func,
  hideModal: PropTypes.func,
  showOrder: PropTypes.bool,
  isLoading: PropTypes.bool,
  serviceData: PropTypes.object,
  servicePlans: PropTypes.array,
  stepParametersValid: PropTypes.bool,
  fulfilled: PropTypes.bool,
  error: PropTypes.bool,
  imageUrl: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  sendSubmitOrder: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  closeUrl: PropTypes.string.isRequired
};

OrderServiceFormStepConfiguration.defaultProps = {
  servicePlans: []
};

const mapStateToProps = ({ orderReducer: { isLoading, servicePlans }}) => ({
  isLoading,
  servicePlans
});

const mapDispatchToProps = dispatch => ({
  fetchPlans: (portfolioItemId) => dispatch(fetchServicePlans(portfolioItemId)),
  sendSubmitOrder: data => dispatch(sendSubmitOrder(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderServiceFormStepConfiguration));
