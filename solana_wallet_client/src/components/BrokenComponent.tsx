function BrokenComponent() {
  throw new Error("💥 Boom!");
  return <div>Hello</div>;
}
export default BrokenComponent