// Sekarang pada ProtectedComponent, kita tetap harus menggunakan useEffect
// Agar terlepas dari Warning yang diberikan
// (useNavigate harus di dalam useEffect)
import  { useEffect } from "react";

// Di sini kita akan akan menggunakan hooks:
// - untuk mendeteksi user sudah login (useAuthState)
// - untuk memaksa navigasi bila user belum login dengan (useNavigate)
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// Untuk bisa menggunakan useAuthState, kita membutuhkan auth dari authentication/firebase
import { auth } from "../authentication/firebase";

// Karena di sini akan nge-slot, maka harus menerima props children
const ProtectedComponent = ({ children }) => {
  // Kita gunakan hooksnya di sini
  const navigate = useNavigate();

  // Karena di sini kita hanya mengecek dari user, kita hanya gunakan [user] saja
  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    // Di sini kita akan membuat logic, apabila user tidak ada (null), maka akan kita
    // "paksa" ke halaman login
    if (!user) {
      navigate("/Login");
      return;
    }
  }, [user, navigate]);

  // Apabila kondisinya masih dalam tahap loading, kita berikan halaman kosong
  if (isLoading) {
    return;
  } else {
    // Bila tidak isLoading (berarti sudah selesai)
    // Kita kembalikan children yang ingin dirender
    return children;
  }

  // // Apabila semua baik baik saja, kita akan mengembalikan children
  // return isLoading ? "" : children;
};

export default ProtectedComponent;
