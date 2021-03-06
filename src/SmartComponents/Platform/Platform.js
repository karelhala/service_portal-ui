import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSelectedPlatform, fetchPlatformItems } from '../../redux/Actions/PlatformActions';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import PlatformToolbar from '../../PresentationalComponents/Platform/PlatformToolbar';
import PlatformItem from '../../PresentationalComponents/Platform/PlatformItem';
import { scrollToTop, filterServiceOffering } from '../../Helpers/Shared/helpers';
import { defaultSettings, getCurrentPage, getNewPage } from '../../Helpers/Shared/pagination';
import { Pagination } from '@red-hat-insights/insights-frontend-components/components/Pagination';
import debouncePromise from 'awesome-debounce-promise';

import './platform.scss';

class Platform extends Component {
  state = {
    filterValue: ''
  };

  fetchData(apiProps, pagination) {
    this.props.fetchSelectedPlatform(apiProps);
    this.props.fetchPlatformItems(apiProps, pagination);
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id, defaultSettings);
    scrollToTop();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(this.props.match.params.id, defaultSettings);
      scrollToTop();
    }
  }

  handleOnPerPageSelect = limit => this.props.fetchPlatformItems(this.props.match.params.id, {
    offset: this.props.paginationCurrent.offset,
    limit
  });

  handleSetPage = (number, debounce) => {
    const options = {
      offset: getNewPage(number, this.props.paginationCurrent.limit),
      limit: this.props.paginationCurrent.limit
    };
    const request = () => this.props.fetchPlatformItems(this.props.match.params.id, options);
    if (debounce) {
      return debouncePromise(request, 250)();
    }

    return request();
  }

  handleFilterChange = filterValue => this.setState({ filterValue });

  render() {
    let filteredItems = {
      items: this.props.platformItems
      .filter(item => filterServiceOffering(item, this.state.filterValue))
      .map(data => <PlatformItem key={ data.id } { ...data } />),
      isLoading: this.props.isPlatformDataLoading
    };

    let title = this.props.platform ? this.props.platform.name : '';

    return (
      <Fragment>
        <PlatformToolbar searchValue={ this.state.filterValue } onFilterChange={ this.handleFilterChange } title={ title }>
          <Pagination
            itemsPerPage={ this.props.paginationCurrent.limit || 50 }
            numberOfItems={ this.props.paginationCurrent.count || 50 }
            onPerPageSelect={ this.handleOnPerPageSelect }
            page={ getCurrentPage(this.props.paginationCurrent.limit, this.props.paginationCurrent.offset) }
            onSetPage={ this.handleSetPage }
            direction="down"
          />
        </PlatformToolbar>
        <ContentGallery { ...filteredItems }/>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ platformReducer: { selectedPlatform, platformItems, isPlatformDataLoading }}) => {
  const platformItemsData = selectedPlatform && platformItems[selectedPlatform.id];
  return {
    paginationLinks: platformItemsData && platformItemsData.links,
    paginationCurrent: platformItemsData && platformItemsData.meta,
    platform: selectedPlatform,
    platformItems: platformItemsData && platformItemsData.data,
    isPlatformDataLoading: !selectedPlatform || isPlatformDataLoading
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSelectedPlatform,
  fetchPlatformItems
}, dispatch);

Platform.propTypes = {
  filteredItems: PropTypes.object,
  isPlatformDataLoading: PropTypes.bool,
  match: PropTypes.object,
  fetchPlatformItems: PropTypes.func.isRequired,
  fetchSelectedPlatform: PropTypes.func,
  platform: PropTypes.shape({
    name: PropTypes.string
  }),
  platformItems: PropTypes.array,
  paginationCurrent: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired
  })
};

Platform.defaultProps = {
  platformItems: [],
  paginationCurrent: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Platform);
