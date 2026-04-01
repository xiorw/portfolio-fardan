# Work Experience Images

Tempatkan foto-foto pengalaman kerja Anda di folder ini.

## Struktur File

Untuk menambahkan foto, gunakan struktur berikut dalam file `Portfolio.tsx`:

```javascript
{
  position: "Fullstack Web Developer",
  company: "PT. Smartelco Solusi Teknologi",
  period: "Praktik Kerja Lapangan (PKL)",
  description: "...",
  documentation: [
    "/work-experience/smartelco-doc-1.jpg",  // Foto dokumentasi 1
    "/work-experience/smartelco-doc-2.jpg",  // Foto dokumentasi 2
    "/work-experience/smartelco-doc-3.jpg",  // Foto dokumentasi 3
    "/work-experience/smartelco-doc-4.jpg",  // Foto dokumentasi 4
  ],
  certificate: [
    "/work-experience/smartelco-certificate.jpg"  // Foto sertifikat
  ]
}
```

## File yang Diperlukankan

### Dokumentasi (4 foto dalam landscape)
- `smartelco-doc-1.jpg` - Foto dokumentasi 1
- `smartelco-doc-2.jpg` - Foto dokumentasi 2
- `smartelco-doc-3.jpg` - Foto dokumentasi 3
- `smartelco-doc-4.jpg` - Foto dokumentasi 4

### Sertifikat (1 foto dalam landscape)
- `smartelco-certificate.jpg` - Foto sertifikat PKL

Sistem akan menampilkan placeholder jika file tidak ditemukan.

