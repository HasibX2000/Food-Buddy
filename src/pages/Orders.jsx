export async function loader() {
  // TODO: Implement orders data loading
  return { orders: [] };
}

export default function Orders() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      {/* Orders content will go here */}
    </div>
  );
}
