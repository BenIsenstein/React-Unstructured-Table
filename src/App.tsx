import { DataObject, UnstructuredTable } from 'UnstructuredTable'
import { useState } from 'react'

const UnstructuredTableSource = `
export type DataObject = Record<string, boolean | number | string>

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
            <th key={col} className="border-1px border-slate-600 p-2" scope="col">
                {col}
            </th>
        )
    }

    for (const row of props.data) {
        const tdatas = []

        for (const col of columns) {
            const value = row[col] ?? ''
            
            tdatas.push(
                <td key={col + value} className="border-1px border-slate-600 p-2">
                    {value}
                </td>
            )
        }

        tbodyElements.push(
            <tr key={row.id ? String(row.id) : JSON.stringify(row)} className="odd:bg-white even:bg-slate-50">
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
  const [hasCopied, setHasCopied] = useState(false)

  return (
    <div className="box-border p-5 relative w-screen min-h-screen h-max bg-yellow-50">
      <h2 className="text-2xl font-medium mb-4">
        Unstructured Table Component
      </h2>
      <a className="block mb-4 w-max hover:text-blue" href="https://github.com/BenIsenstein/React-Unstructured-Table">
        Source code
      </a>
      <pre className="relative text-sm mb-8 p-4 pt-8 rounded-sm border-1px border-black bg-slate-300 w-max">
        {hasCopied && (
            <div className="absolute right-18 top-4 p-1 rounded-md bg-slate-50">copied!</div>
        )}
        <button
            className="absolute right-4 top-4 p-1 rounded-md bg-slate-50 hover:bg-slate-600 hover:text-white active:bg-slate-300"
            onClick={() => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(UnstructuredTableSource)
                    .then(() => {
                        setHasCopied(true)
                        setTimeout(() => setHasCopied(false), 2000)
                    })
                }
            }}
        >
            copy
        </button>
        {UnstructuredTableSource}
      </pre>
      <h2 className="text-2xl font-medium mb-4">
        Data Table
      </h2>
      <button className="p-2 mb-4 border-1px border-black rounded-md" onClick={() => setData(generateRandomTableData())}>
        Generate new data
      </button>
      <div className="w-max max-w-full h-max max-h-90vh overflow-scroll border-y-1px border-black">
        <UnstructuredTable data={data} />
      </div>
    </div>
  )
}
