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


import ApiClient from '../ApiClient';





/**
* The Provider model module.
* @module model/Provider
* @version 1.0.0
*/
export default class Provider {
    /**
    * Constructs a new <code>Provider</code>.
    * @alias module:model/Provider
    * @class
    * @param name {String} 
    * @param url {String} 
    * @param token {String} The token used to connect to the provider
    */

    constructor(name, url, token) {
        

        
        

        this['name'] = name;this['url'] = url;this['token'] = token;

        
    }

    /**
    * Constructs a <code>Provider</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/Provider} obj Optional instance to populate.
    * @return {module:model/Provider} The populated <code>Provider</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Provider();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('url')) {
                obj['url'] = ApiClient.convertToType(data['url'], 'String');
            }
            if (data.hasOwnProperty('user')) {
                obj['user'] = ApiClient.convertToType(data['user'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('token')) {
                obj['token'] = ApiClient.convertToType(data['token'], 'String');
            }
            if (data.hasOwnProperty('verify_ssl')) {
                obj['verify_ssl'] = ApiClient.convertToType(data['verify_ssl'], 'Boolean');
            }
        }
        return obj;
    }

    /**
    * @member {String} id
    */
    id = undefined;
    /**
    * @member {String} name
    */
    name = undefined;
    /**
    * @member {String} description
    */
    description = undefined;
    /**
    * @member {String} url
    */
    url = undefined;
    /**
    * The user used to connect to the provider
    * @member {String} user
    */
    user = undefined;
    /**
    * The password used to connect to the provider
    * @member {String} password
    */
    password = undefined;
    /**
    * The token used to connect to the provider
    * @member {String} token
    */
    token = undefined;
    /**
    * Verify the servers certificate, you can disable it for servers with self signed certificates.
    * @member {Boolean} verify_ssl
    * @default true
    */
    verify_ssl = true;








}


