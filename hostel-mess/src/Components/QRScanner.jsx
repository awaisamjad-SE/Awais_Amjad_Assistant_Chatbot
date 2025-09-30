import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ setStudentId }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render((decodedText) => {
      setStudentId(decodedText);
      alert("Student ID scanned: " + decodedText);
    });
  }, []);

  return <div id="reader" style={{ width: "400px" }}></div>;
}
