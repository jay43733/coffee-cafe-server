# Coffee Cafe - CC18

## env guide

PORT = 8080
DATABASE_URL="mysql://root:jay43733@localhost:3306/coffee-cafe"

SECRET_KEY = coffee_jay_cafe

CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

---

## service

| path        | method | auth | role  | params | query | body                                                               |
| :---------- | :----- | :--: | :---- | :----- | :---- | :----------------------------------------------------------------- |
| /register   | post   |  -   | all   | -      | -     | {firstName,lastName,phoneNumber,email,password, confirmPassword}   |
| /login      | post   |  -   | all   | -      | -     | {email,password}                                                   |
| /admin/user | get    |  -   | admin | -      | -     | -                                                                  |
| /product    | get    |  y   | all   | -      | -     | -                                                                  |
| /product    | post   |  y   | all   | -      | -     | {userId, productId, amount,total_price,sweetness?,roast?,comment?} |
