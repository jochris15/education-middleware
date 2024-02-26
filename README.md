## Proses Login
- Saat login, harus menyimpan hal-hal yang penting agar nanti bisa di identifikasi siapa user yang sedang login 
- JWT disini tugasnya untuk menggantikan session (soalnya session dianggap kurang aman, dan di refresh jg langsung hilang)
- jadi pada saat login , sekarang kita bisa membuat payload (data-data yang akan disimpan) yang berisi contohnya id yang lagi login, rolenya, dan usernamenya 
- Tidak seperti session , data2 yang akan disimpen itu ibaratnya di encrypt dulu (supaya lebih aman) dan dijadikan acesss token
- Karena kita sekarang udah gak server side rendering, udah jadi REST API, kita kirim access tokennya di res.statusnya

## Proses Apps
- Mencari Data Medical Record beserta dokternya milik patient yang sedang login
- Mencari Medical Record secara detail

## Authentication (Bearer Token)
- ini adalah proses pengecheckan, udah login apa belom (pemberian akses)
- tidak seperti session yang sesimpel ngecheck id nya tersimpan di object session apa enggak, kita harus medecode access tokenya terlebih dahulu
- sesudah di decode , kita bisa mendapatkan data-data yang kita simpan pada saat login dan bisa mencari user, ada gak usernya 
- simpan juga data-data yang tadi sudah kita decode dalam request

## Authorization
- ini adalah proses pengecheckan, siapa yang lagi login (pemberian kekuasaan)
- disini, cmn bisa liat medical record punya sendiri, jadi harus cari pasiennya dulu bedasarkan yang lagi login
- kalo ketemu pasiennya, baru cari medical record bedasarkan paramnya
- setelah ketemu medical recordnya, agar lebih secure, harus dicheck, apakah PK patient dan FK sama

## Error Handler
- hanya sebuah pemisahan error menjadi suatu komponen agar code kalian tidak redundant, karena banyak error yang sama 
- error2 yang akan di handle :
    - error pada saat input datanya salah (SequelizeValidationError, etc) (400)
    - error pas login (either password / username salah atau user blm ada) (401)
    - error disaat access tokennya gak ada (401)
    - error pas verify token gagal (401)
    - error pada saat otorisasi (403)
    - error kalo pada saat data gak ketemu (404)
    - global error (500)

## DOTENV
membantu kita untuk simpen informasi2 penting secara aman dan juga memudahkan kita untuk memanage dan menggunakan variabelnya secara konsisten dan terorganisir.

