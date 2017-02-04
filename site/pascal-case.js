import {camelCase, flow, upperFirst} from 'lodash';

export default flow(camelCase, upperFirst);
