import { DataObject, UnstructuredTable } from 'UnstructuredTable'
import { useState } from 'react'
const UnstructuredTableSource = `
type DataObject = Record<string, boolean | number | string>

export function UnstructuredTable(props: { data: DataObject[] }) {
    const columns = new Set<string>()
    const theadElements = []
    const tbodyElements = []
    
    for (const row of props.data) {
        for (const key in row) {
            columns.add(key)
        }
    }

    for (const col of columns) {
        theadElements.push(
            <th
                key={col}
                className="border-1px border-slate-600 p-2" 
                scope="col"
            >
                {col}
            </th>
        )
    }

    for (const row of props.data) {
        const tdatas = []

        for (const col of columns) {
            const value = row[col] ?? ''
            
            tdatas.push(
                <td
                    key={col + value}
                    className="border-1px border-slate-600 p-2"
                >
                    {value}
                </td>
            )
        }

        tbodyElements.push(
            <tr
                key={row.id ? String(row.id) : JSON.stringify(row)}
                className="odd:bg-white even:bg-slate-50"
            >
                {tdatas}
            </tr>
        )
    }

    return (
        <table className="border-1px border-black">
            <thead className="bg-slate-300">
                <tr>
                    {theadElements}
                </tr>
            </thead>
            <tbody>
                {tbodyElements}
            </tbody>
        </table>
    )
}
`

function generateRandomTableData(): DataObject[] {
    const data: DataObject[] = []
    const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

    for (let i = 0; i < 50; i++) {
        const numOfKeys = Math.ceil(Math.random() * keys.length)
        const keyIndexes = new Set<number>()

        while (keyIndexes.size < numOfKeys) {
            const randomIndex = Math.floor(Math.random() * keys.length)
            keyIndexes.add(randomIndex)
        }

        const row: DataObject = {}

        for (const i of keyIndexes) {
            row[keys[i]] = Math.round(Math.random() * 100000)
        }

        data.push(row)
    }

    return data
}

export function App() {
  const [data, setData] = useState<DataObject[]>(() => generateRandomTableData())

  return (
    <div className="box-border p-5 relative w-screen min-h-screen h-max bg-yellow-50">
      <h2 className="text-2xl font-medium mb-4">Unstructured table component</h2>
      <pre className="text-sm mb-8">
        {UnstructuredTableSource}
      </pre>
      <h2 className="text-2xl font-medium mb-4">Month-by-month data table</h2>
      <button className="p-2 mb-4 border-1px border-black rounded-md" onClick={() => setData(generateRandomTableData())}>Generate new data</button>
      <div className="w-max max-w-full h-max max-h-90vh overflow-scroll">
        <UnstructuredTable data={data} />
      </div>
    </div>
  )
}
