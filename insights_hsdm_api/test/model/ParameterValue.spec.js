/**
 * Insights Service Catalog API
 * This is a API to fetch and order catalog items from different cloud sources
 *
 * OpenAPI spec version: 1.0.0
 * Contact: you@your-company.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.InsightsServiceCatalogApi);
  }
}(this, function(expect, InsightsServiceCatalogApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new InsightsServiceCatalogApi.ParameterValue();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('ParameterValue', function() {
    it('should create an instance of ParameterValue', function() {
      // uncomment below and update the code to test ParameterValue
      //var instane = new InsightsServiceCatalogApi.ParameterValue();
      //expect(instance).to.be.a(InsightsServiceCatalogApi.ParameterValue);
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new InsightsServiceCatalogApi.ParameterValue();
      //expect(instance).to.be();
    });

    it('should have the property value (base name: "value")', function() {
      // uncomment below and update the code to test the property value
      //var instane = new InsightsServiceCatalogApi.ParameterValue();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new InsightsServiceCatalogApi.ParameterValue();
      //expect(instance).to.be();
    });

    it('should have the property format (base name: "format")', function() {
      // uncomment below and update the code to test the property format
      //var instane = new InsightsServiceCatalogApi.ParameterValue();
      //expect(instance).to.be();
    });

  });

}));
