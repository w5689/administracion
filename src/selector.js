import { useSelector } from "react-redux";

export default function selector(db, sel) {
  return useSelector((state) => state[db][sel]);
}
