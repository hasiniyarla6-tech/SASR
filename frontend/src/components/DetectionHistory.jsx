function DetectionHistory({ history }) {
  return (
    <div className="mt-16 bg-slate-900 rounded-3xl p-8 border border-slate-700">

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        📋 Detection History
      </h2>

      {history.length === 0 ? (

        <p className="text-slate-400">
          No detections yet.
        </p>

      ) : (

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="py-3">Time</th>
              <th>Victims</th>
              <th>Risk</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {history.map((item, index) => (

              <tr
                key={index}
                className="border-b border-slate-800 hover:bg-slate-800"
              >

                <td className="py-4">{item.time}</td>
                <td>{item.victims}</td>
                <td>{item.risk}</td>
                <td>{item.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default DetectionHistory;