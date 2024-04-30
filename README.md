## Authentication (Bearer Token)
- ini adalah proses pengecheckan, udah login apa belom (pemberian akses)
- tidak seperti session yang sesimpel ngecheck id nya tersimpan di object session apa enggak, kita harus medecode access tokenya terlebih dahulu
- sesudah di decode , kita bisa mendapatkan data-data yang kita simpan pada saat login dan bisa mencari user, ada gak usernya 
- simpan juga data-data yang tadi sudah kita decode dalam request

## Authorization
- ini adalah proses pengecheckan, siapa yang lagi login (pemberian kekuasaan)
- disini, admin itu bisa delete/update/read detail semua event, sedangkan staff cmn bisa mengupdate / mendelete / read detail data event yang dibuat sendiri
- kita perlu check rolenya admin / staff, kalau admin bisa langsung next
- jadi kita perlu mencari data event yang ingin diupdate/didelete lalu mencari user yang sedang login
- lalu dicocokan antara FK userId di event dan PK di user, apakah sama atau tidak

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
