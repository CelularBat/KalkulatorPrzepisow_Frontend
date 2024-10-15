import React from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import '../../DataTables/datatables.css'




DataTable.use(DT);
    
function MyProductsTable({TableData}) {
    
    

 
    return (
        <DataTable
            className="display"
            data={TableData}
            columns= {[
                { data: 'category' },
                { data: 'name' },
                { data: 'brand' },
                { data: 'kj' },
                { data: 'kcal' },
                { data: 'fat' },
                { data: 'carb' },
                { data: 'sugar' },
                { data: 'protein' },
                { data: 'fiber' },
                { data: 'salt' },
                { data: 'public' }
              ]}
              options={{
                responsive: true,
                select: true
            }}
        >
             <thead>
                  <tr>
                      <th>Kategoria</th>
                      <th>Nazwa</th>
                      <th>Marka</th>
                      <th>kj</th>
                      <th>kcal</th>
                      <th>Tłu</th>
                      <th>Węg</th>
                      <th>Cuk</th>
                      <th>Bia</th>
                      <th>Bło</th>
                      <th>Sól</th>
                      <th>Pub?</th>
                  </tr>
              </thead>
              <tbody>
              </tbody>
                <tfoot>
                  <tr>
                      <th>Kategoria</th>
                      <th>Nazwa</th>
                      <th>Marka</th>
                      <th>kj</th>
                      <th>kcal</th>
                      <th>Tłu</th>
                      <th>Węg</th>
                      <th>Cuk</th>
                      <th>Bia</th>
                      <th>Bło</th>
                      <th>Sól</th>
                      <th>Pub?</th>
                     
                  </tr>
              </tfoot>
        </DataTable>
    );

}

export default MyProductsTable;