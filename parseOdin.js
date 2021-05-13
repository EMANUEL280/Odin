"use strict";

//Modulos
const fs = require("fs");
const moment = require('moment');
const jsonfile = require('jsonfile');
const excelToJson = require('convert-excel-to-json');

class ParseOdin {
    init() {
        let odin = this.parseOdin();
        let proccesData = this.processOdin(odin);
        this.insertData(proccesData);
    }
    insertData(odin) {
        try {
            for (let i = 0; i < odin.length; i++) {
                for (let f = 0; f < odin[i]['services'].length; f++) {
                    let sku = odin[i]['services'][f]['sku'];
                    let skuRefund = odin[i]['services'][f]['skuRefund'];
                    if (sku === undefined) { delete odin[i]['services'][f]['sku'] }
                    if (skuRefund === undefined) { delete odin[i]['services'][f]['skuRefund'] }
                }
            }
            const config = require('./dbConfig');
            const MongoClient = require('mongodb').MongoClient;
            MongoClient.connect(config.urlMongo, config.option, function(err, client) {
                if (err) {
                    console.log(err)
                }
                /* console.log(client); */
                const db = client.db(config.db);
                db.collection("odin").insertMany(odin, function(err, result) {  //colección
                    if (err) {
                        console.log(err)
                    }
                    console.log(result);
                })
                client.close();
            })
        } catch (e) {
            console.log(e)
        }
    }
    processOdin(odin) {
        let processData = [];
        try {
            let temporal = [];
            for (let i = 0; i < odin.length; i++) {
                let temp = [];
                let folio = {};
                let find = true;
                let id = odin[i].accountId;
                let bandera_band = 0;
                let bandera_aprov = true;
                let bandera = 0;
                if (temporal.length != 0) {
                    let validation = temporal.filter(data => data === id)
                    if (validation.length >= 1) {
                        bandera_aprov = false;
                    }

                }
                if (bandera_aprov == false) {
                    continue;
                } else {

                    while (bandera < odin.length) {
                        if (id == odin[bandera].accountId) {
                            temporal.push(id);
                            let subscription = odin[bandera].subscriptionId.toString();
                            let status = odin[bandera].subStatus;
                            let ordenDate = odin[bandera].orderDate;
                            let orderNumber = odin[bandera].orderNumber;
                            let datasku = odin[bandera].sku;
                            let dataSkuRefund = odin[bandera].skuRefund;
                            let description = odin[bandera].description;
                            let qty = odin[bandera].qty;
                            let unitaryPrice = odin[bandera].unitaryPrice;
                            let discount = odin[bandera].discount;
                            let extendePrice = odin[bandera].extendePrice;
                            let startDate = odin[bandera].startDate;
                            let endDate = odin[bandera].endDate;
                            let service = {
                                subscriptionId: subscription,
                                subStatus: status,
                                orderDate: ordenDate,
                                orderNumber: orderNumber,
                                sku: datasku,
                                skuRefund: dataSkuRefund,
                                description: description,
                                qty: qty,
                                unitaryPrice: unitaryPrice,
                                discount: discount,
                                extendePrice: extendePrice,
                                startDate: startDate,
                                endDate: endDate
                            }
                            temp.push(service);
                        }
                        let accId = odin[i].accountId.toString();
                        folio = {
                            accountId: accId,
                            companyName: `${odin[i].companyName}`,
                            services: temp,
                        }
                        bandera++;
                    }
                    if (folio != undefined) {
                        processData.push(folio);
                    }
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return processData;
        }
    }
    parseOdin() {
        let odin = [];
        try {
            let parse = excelToJson({
                sourceFile: 'Odin_Marzo_2021.xlsx',
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: 'accountId',
                    B: 'companyName',
                    C: 'subscriptionId',
                    D: 'subStatus',
                    E: 'orderDate',
                    F: 'orderNumber',
                    G: 'description',
                    H: 'sku',
                    I: 'skuRefund',
                    J: 'qty',
                    K: 'unitaryPrice',
                    L: 'discount',
                    M: 'extendePrice',
                    N: 'startDate',
                    O: 'endDate'
                },
                sheets: ['Hoja1']
            });
            odin = parse['Hoja1']
        } catch (e) {
            console.log(e)
        } finally {
            return odin;
        }
    }
}
let x = new ParseOdin();
x.init();