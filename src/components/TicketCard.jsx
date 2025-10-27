export default function TicketCard({ ticket, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 border">
      <h3 className="text-lg font-semibold">{ticket.title}</h3>
      <p className="text-gray-600">{ticket.description}</p>
      <div className="flex justify-between mt-3 text-sm">
        <span>Status: <b>{ticket.status}</b></span>
        <div className="space-x-3">
          <button onClick={onEdit} className="text-blue-600 hover:underline">
            Edit
          </button>
          <button onClick={() => onDelete(ticket.id)} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
