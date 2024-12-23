import connectPool from './connection.js';
import {getCache, resetKey, setCache} from "./redis/cache.js";
const pool = await connectPool();
export const actionToGetSEOReferencesApiCall = async (body) => {
    let {condition} = body;
    console.log(condition,'condition')
    let seoReference = await getCache('shikshak-admin-seo-reference');
    console.log(seoReference,'seoReference')
    if(!condition && seoReference){
        console.log('10')
        return seoReference;
    } else{
        try {
            return new Promise(function (resolve, reject) {
                let where = (condition) ? ` ${condition} ` : '';
                const query = `select seo_reference.*
                               from seo_reference ${where}`;
                console.log(query,'query')
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    let data = [];
                    if (results?.length) {
                        data = results;
                    }
                    !condition && setCache('shikshak-admin-seo-reference', JSON.stringify(data))
                    resolve(data);
                })
            })
        }catch (error) {
            // Handle the error
            console.error("Database error:", "An error occurred while processing your request.");
            // Send a user-friendly error message or log it as appropriate
        }

    }

}
export const actionToGetUrlSlugApiCall = (body) => {
    let {condition} = body;
    return new Promise(function(resolve, reject) {
        let where = (condition) ? ` ${condition} ` : '';
        const query = `select url_slug_map.* from url_slug_map ${where}`;
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
}
export const actionToGetSEOReferencesHtmlDropdownApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = `select seo_reference_html.* from seo_reference_html order by id`;
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
}
export const actionToGetSEOMetaDataApiCall = () => {
        try{
            return new Promise(async function (resolve, reject) {
                let seoReference = await getCache('shikshak-admin-seo-meta-data');
                if(seoReference){
                    resolve(JSON.parse(seoReference));
                } else {
                    const query = `SELECT JSON_OBJECTAGG(seo.page_slug, seo.jsdata) as data
                               from (SELECT seo.page_slug,
                                            JSON_ARRAYAGG(JSON_OBJECT('id', seo.id,
                                                                      'name', seo.name,
                                                                      'charset', seo.charset,
                                                                      'content', seo.content,
                                                                      'page_slug', seo.page_slug,
                                                                      'http_equiv', seo.http_equiv,
                                                                      'html_type', seo.html_type,
                                                                      'seo_html_type',
                                                                      (SELECT html FROM seo_reference_html WHERE id = seo.html_type),
                                                                      'page_url', seo.page_url)) AS jsdata
                                     FROM seo_reference AS seo
                                              left join seo_reference_html as seo_html_type ON seo.html_type = seo_html_type.id
                                     GROUP BY seo.page_slug) AS seo`;
                    pool.query(query, (error, results) => {
                        if (error) {
                            reject(error)
                        }
                        let data = [];
                        if (results?.length) {
                            data = results[0]['data'];
                        }
                         setCache('shikshak-admin-seo-meta-data',JSON.stringify(data))
                        resolve(data);
                    })

                }
            })
        } catch (e){
            console.log(e);
        }

}
export const actionToGetURLSlugDataApiCall = () => {
    try {
        return new Promise(async function (resolve, reject) {
            let seoReference = await getCache('shikshak-admin-url-slug-data');
            if (seoReference) {
                console.log('114')
                resolve(JSON.parse(seoReference));
            } else {
                const query = `SELECT JSON_OBJECTAGG(url.url_path, url.slug) jsdata
                               FROM url_slug_map as url`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    let data = [];
                    if (results?.length) {
                        data = results[0]['jsdata'];
                    }
                    setCache('shikshak-admin-url-slug-data', JSON.stringify(data))
                    resolve(data);
                })
            }
        })
    }catch (e){
        console.log(e,'e')
    }
}
export const actionToDeleteAllCacheDataApiCall=async (key)=>{
    await resetKey(key);
    return key;
}

export const actionToGetWebSettingsContentApiCall = (body) => {
    let {id} = body;
    let where = id ? `and web.source = ${id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `select web.*, comp.name as company_name from website_content web
                                         LEFT JOIN company comp on comp.id=web.source where web.is_active='1' ${where}`;
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
export const actionToGetWebSettingSeoMetaApiCall = (body) => {
    let {id} = body;
    let where = id ? `and web.source = ${id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `select seo.*, comp.name as company_name,ref.name as html_type_name from seo_reference seo
                                         LEFT JOIN company comp on comp.id=seo.source
                                         LEFT JOIN seo_reference_html ref on ref.id=seo.html_type where seo.is_active='1' ${where}`;
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
export const actionToGetWebSettingSeoReferenceHtmlApiCall = (body) => {
    let {id} = body;
    let where = id ? `and web.source = ${id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `select * from seo_reference_html `;
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
export const actionToGetWebsiteContentApiCall = (body) => {
    let {id} = body;
    let where = id ? `and content.source = ${id} ` : ``;
    return new Promise(function(resolve, reject) {
        const query = `SELECT JSON_OBJECTAGG(content.name, content.jsdata) as data
                       from (SELECT content.name, JSON_ARRAYAGG(JSON_OBJECT('id', content.id,
                                                                            'name', content.name,
                                                                            'object_key', content.object_key,
                                                                            'object_value', content.object_value,
                                                                            'object_type', content.object_type,
                                                                            'object_extras', content.object_extras)) AS jsdata
                             FROM website_content AS content WHERE is_active=1 ${where} GROUP BY content.name) AS content`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(query)
            }
            let data = [];
            if(results?.length){
                data = results[0]['data'];
            }
            resolve(data);
        })
    })
}

export const actionToGetSEOMetaDataWebsiteApiCall = () => {
    try{
        return new Promise(async function (resolve, reject) {
            let seoReference = await getCache('shikshak-admin-seo-meta-data-website');
            if(seoReference){
                resolve(JSON.parse(seoReference));
            } else {
                const query = `SELECT JSON_OBJECTAGG(seo.url, seo.jsdata) as data
                               from (SELECT seo.url,
                                            JSON_ARRAYAGG(JSON_OBJECT('id', seo.id,
                                                                      'name', seo.name,
                                                                      'charset', seo.charset,
                                                                      'content', seo.content,
                                                                      'page_slug', seo.page_slug,
                                                                      'http_equiv', seo.http_equiv,
                                                                      'html_type', seo.html_type,
                                                                      'seo_html_type',
                                                                      (SELECT html FROM seo_reference_html WHERE id = seo.html_type),
                                                                      'url', seo.url)) AS jsdata
                                     FROM seo_reference AS seo
                                              left join seo_reference_html as seo_html_type ON seo.html_type = seo_html_type.id
                                     GROUP BY seo.url) AS seo`;
                pool.query(query, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    let data = [];
                    if (results?.length) {
                        data = results[0]['data'];
                    }
                    setCache('shikshak-admin-seo-meta-data',JSON.stringify(data))
                    resolve(data);
                })

            }
        })
    } catch (e){
        console.log(e);
    }

}