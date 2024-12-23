import connectPool from './connection.js';
// import {getCache, setCache} from "./redis/cache.js";
const pool = await connectPool();
import XLSX from 'xlsx';
export const actionToGetVendorApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select vendor.* from vendor ${where}`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
}

export const actionToGetCustomerApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select customer.* from customer ${where}`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
}
export const actionToGetProductListApiCall = (body) => {
    return new Promise(function(resolve, reject) {
        const query = `SELECT prod.*, subcat.name AS sub_category_name, cat.name AS category_name,subcat.category_id as category_id,
                              brand.name as brand_name, comp.name as company_name,detail.slug as slug,cat.source as source,
                              detail.id as product_detail_id,detail.long_description,detail.min_class,detail.max_class,detail.min_age,detail.max_age,
                              detail.product_curriculum_focus,detail.product_curriculum_name,detail.product_curriculum_description,detail.product_curriculum_index_photo
                       FROM products AS prod
                                LEFT JOIN sub_categories AS subcat ON subcat.id = prod.sub_category_id
                                LEFT JOIN categories AS cat ON cat.id=subcat.category_id
                                LEFT JOIN company comp on comp.id=cat.source
                                LEFT JOIN product_details detail on detail.product_id=prod.id
                                LEFT JOIN brand ON prod.brand_id=brand.id`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
}
export const actionToGetProductImagesApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select * from product_photos where product_id = ${id}`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
}
export const actionToGetProductCurriculumApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select * from product_curriculum where product_id = ${id}`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
}
export const actionToGetProductCurriculumImagesApiCall = (body) => {
    let {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `select * from product_curriculum_photos where product_curriculum_id = ${id}`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results;
            }
            resolve(data);
        })
    })
}
export const actionToImportProductExcelApiCall = async(file) =>{
    const workbook = XLSX.read(file.content, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    const query = `INSERT INTO products (categoryId, type, location, in_stock_qty, name, brand, status, unitSize, netPrice, slug, description,  purchase_price)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY Update location =  VALUES(location) ,in_stock_qty= VALUES(location),type=VALUES(type)`;
    try {
        const connection = await pool.getConnection();
        for (const row of data) {
            const values = [row.name, row.column1, row.column2]; // Adjust based on your columns
            await connection.query(query, values);
        }
        connection.release();
        return 'File uploaded and data inserted/updated successfully.';
    } catch (error) {
        console.error('Error processing file:', error);
        return 'Error processing file.';
    }
    console.log(data,'data 12');
   return data;
}

export const actionToGetCategoryListApiCall =  (body) => {
    try {
        return new Promise(async function(resolve, reject) {
          /* let {condition} = body;
            let where = (condition) ? ` ${condition} ` : '';*/
            const query = `select categories.*,c.name AS company_name from categories  
    join company c on c.id=categories.source where is_active='1'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error)
                }
                let data = [];
                if(results?.length){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        console.log(e);
    }
}
export const actionToGetSubCategoryListApiCall =  (body) => {
    try {
        return new Promise(async function(resolve, reject) {
          /* let {condition} = body;
            let where = (condition) ? ` ${condition} ` : '';*/
            const query = `select s.*,cat.name AS category,cat.name AS company_name from sub_categories s join categories cat on cat.id=s.category_id join company c on c.id=cat.source where s.is_active='1'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error)
                }
                let data = [];
                if(results?.length){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        console.log(e);
    }
}

export const actionToGetBrandListApiCall =  () => {
    try {
        return new Promise(async function(resolve, reject) {
            const query = `select b.* from brand b where b.is_active='1'`;
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error)
                }
                let data = [];
                if(results?.length){
                    data = results;
                }
                resolve(data);
            })
        })
    }catch (e){
        console.log(e);
    }
}