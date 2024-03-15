function promesa1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("1")
            resolve('ok')
        }, 2000)

    })

}
//promesa.thern((resultado)=>{console.log(resultado)})

function promesa2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2")
            resolve('ok')
        }, 4000)

    })

}

function promesa3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("3")
            resolve('ok')
        }, 3000)

    })

}

Promise.allSettled([promesa1(), promesa2(), promesa3()])
    .then(result => console.log(result))
    .catch(error => console.log(error))