import axios from 'axios';

import { 
    FETCH_SUMMARY
} from './types';
import { ROOT_URL } from '../config/api_settings';

export function fetchSummary() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/summary/`,
    })
    return {
        type: FETCH_SUMMARY,
        payload: request
    };
}