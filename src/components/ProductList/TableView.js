import { Table } from 'react-bootstrap'

function TableView() {

    return (
        <Table className='mt-5' striped bordered hover responsive >
            <thead>
                <tr>
                    <th>编号</th>
                    <th>商品名称</th>
                    <th>价格</th>
                    <th>计划单数</th>
                    <th>已评单数</th>
                    <th>详情</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default TableView