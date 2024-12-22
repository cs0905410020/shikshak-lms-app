module.exports = ({name,price1,price2,price3,receipt,email})=>{
    const today = new Date()
    return `
    <table xmlns="http://www.w3.org/1999/html">
    <tbody style="text-align: right; margin-bottom: 20px;">
            <tr>
                <td>
                    <h1 style="font-family:sans-serif; text-align:right;">Tax Invoice/Bill of Supply/Cash Memo</h1>
                </td>
            </tr>
            
        </tbody>
        </table>
        <table>
        <tbody style="display: flex; text-align: right; justify-content: right; font-size: 20px;">
            <tr>
                <td>
                    <p style=" text-align:right; margin: 0; font-family: sans-serif;"><strong> Original for Recipient </strong></p>
                </td>
            </tr>
    </tbody>
    </table>
        <table>
            <tbody style="display: flex; justify-content: space-between;">                                
            <tr>
                <td>
                    <h3><strong>Sold By:</strong></h3>
                    <h3><strong>R K WorldInfocom Pvt. Ltd.</strong></h3>
                    <p>HAFED Warehousing Complex, New Anaj Mandi,</p>
                    <p>GURUGRAM Dist Gurgaon,Haryana, 122001 IN</p>
                </td>
            </tr>
            <tr style="text-align: right;">
                <td>
                    <h3><strong>Billing Address :</strong></h3>
                    <h3><strong>Saurabh Abhishek</strong></h3>
                    <p>861 Ground Floor, Sector 47</p>
                    <p>Gurgaon,Haryana, 122018 IN</p>
                    <p><strong>State/UT Code : </strong>06 </p>
                </td>
            </tr>  
            </tbody>
            </table>
            <table>
            <tbody style="display: flex; justify-content: space-between;">                                
                <tr>
                    <td>
                        <h3><strong>PAN No:</strong> AAECR0564M</h3>
                        <h3><strong>GST Registration No:</strong> 06AAECR0564M1Z7</p>
                    </td>
                </tr>
                <tr style="text-align: right;">
                    <td>
                        <h3><strong>Shipping Address :</strong></h3>
                        <h3><strong>Saurabh Abhishek</strong></h3>
                        <p>861 Ground Floor, Sector 47</p>
                        <p>Gurgaon,Haryana, 122018 IN</p>
                        <p><strong>State/UT Code : </strong>06 </p>
                    </td>
                </tr>  
                </tbody>   
                </table>
                <table>
                <tbody style="display: flex; justify-content: space-between;">                                
                    <tr>
                        <td>
                            <h3><strong>Order Number :</strong> 407-8427449-1015518 </h3>
                            <h3><strong>Order Date : </strong>04.09.2023</p>
                        </td>
                    </tr>
                    <tr style="text-align: right;">
                        <td>
                            <h3><strong>Place of Supply:</strong> HARYANA</h3>
                            <h3><strong>Place of Delivery:</strong> HARYANA</h3>
                            <h3><strong>Invoice Number:</strong> FDLB-228682</h3>
                            <h3><strong>Invoice Details:</strong> HR-FDLB-1293787125-2324</h3>
                            <h3><strong>Invoice Date:</strong> 04.09.2023</h3>
                        </td>
                    </tr>  
                    </tbody>        
                    </table> 
        <table>
          <tr>
            <td>
                <table id="table" class="table" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Sl. No</th>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Description</th>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Unit Price</th>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Qty</th>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Net Amount</th>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Tax Rate</th>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Tax Type</th>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Tax Amount</th>
                            <th style="background-color: #f0f0f0; border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">1</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">Organic Harvest Cold Pressed Extra Virgin Coconut Oil | For Hair & Skin | For Men & Women | Ideal For All Type Skin & Hair Growth | Unbleached & Unrefined | Sulphate & Paraben Free - 200ml | B0928X4Y6G ( B0928X4Y6G ) HSN:33059090</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">₹233.90</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">1</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">₹233.90</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">9%</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">CGST</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">₹21.05</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">₹276.00</td>
                        </tr>
                        <tr>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">9%</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">SGST</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">₹21.05</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                        </tr>
                        <tr>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"><strong>TOTAL : </strong> </td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;"></td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">₹42.10</td>
                            <td style="border: 3px solid #000; padding: 8px; text-align: left; font-size: 20px;">₹276.00</td>
                        </tr>
                    </tbody>
                </table>
            </td>
          </tr>
          </table>
          <table>
          <tbody style="display: flex; justify-content: space-between; margin-top: 20px;  border: 3px solid #000; text-align: left; font-size: 20px; padding-left: 10px;">                                
            <tr>
                <td>
                    <h3>Total Amount in Words :</h3>
                    <p><strong>Two Hundred Seventy-six Only</strong></p>
                </td>
            </tr>
            </tbody> </table>
            <table>
            <tbody style="margin-top: 20px;  border: 3px solid #000; text-align: right; font-size: 16px; padding-left: 10px;">                                
                <tr>
                    <td>
                        <h2>For R K WorldInfocom Pvt. Ltd :</h2>
                        <h3>Authorized Signatory</h3>
                    </td>
                </tr>
                </tbody>
                </table>
                <table>
            <tbody style="margin-top: 20px; text-align: left; font-size: 16px; padding-left: 10px;">                                
                    <tr>
                        <td>
                            <h2 id="tax">Whether Tax is Payable under Reverse Charge - No</h2>
                        </td>
                    </tr>
            </tbody>
            </table>
            <table>
            <tbody style="margin-top: 20px; font-size: 12px; display: flex; flex-direction: row; border: 1px solid #000; font-size: 16px; padding-left: 8px; padding-right: 5px; text-align: left;">                                
                <tr>
                    <td>
                        <p><strong>Payment Transaction ID :</strong>2ltMAFf4QZ2MZoJBrUDK</p>
                        <p><strong>Date & Time :</strong>04/09/2023, 08:44:25 hrs</p>
                        <p><strong>Invoice Value :</strong>276.00</p>
                        <p><strong>Mode of Payment :</strong>Credit Card</p>
                    </td>
                </tr>
            </tbody> </table>      
    `

}