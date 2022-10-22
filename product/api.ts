import { Product } from './types';
import Papa from 'papaparse';
import Axios from 'axios';


export default {
    list: async (): Promise<Product[]> => {
        return Axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSm1LvI1iXT2czoTHT9Lmk3fLmJGo36jTL4M-tQris1oC2E92WQh3N27p2a9tvAM8c8CzMaW0JI-1lE/pub?output=csv', 
            { responseType: 'blob' }
            ).then(response => 
                new Promise<Product[]>((resolve, reject) => {
                    Papa.parse<Product>(response.data, {
                        header: true,
                        complete: results => {
                            const products = results.data as Product[]
                            return resolve(products.map(product => ({
                                ...product,
                                price: Number(product.price)
                            })))
                        },
                        error: (error) => reject(error?.message)
                    });
                })    
            )
    }           
}