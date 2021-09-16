export default function generateId() {
  return new Date().getTime() * Math.floor(Math.random() * 100);
}