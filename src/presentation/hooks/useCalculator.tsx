import { useRef, useState } from "react"

enum Operators {
    add,
    subtract,
    multiply,
    divide
}

export const useCalculator = () => {
  
    const [number, setNumber] = useState('0')
    const [previusNumber, setPreviusNumber] = useState('0')

    const lastOperation = useRef<Operators>()

    const deleteLast = () => {
        if( number.length === 1 || (number.length === 2 && number.includes('-'))) {
            return setNumber('0')
        }

        setNumber(number.slice(0,-1))
    }
    
    const clean = () => {
        setNumber('0')
        setPreviusNumber('0')
    }

    const toggleSign = () => {
        if( number.includes('-')) {
            return setNumber( number.replace('-','') )
        }

        setNumber( '-' + number)
    }

    const buildNumber = ( numberString: string ) => {

        if( number.includes('.') && numberString === '.') return

        if( number.startsWith('0') || number.startsWith('-0') ) {
            
            // Punto decimal
            if( numberString === '.' ) {
                return setNumber(number + numberString)
            }

            // Evaluar si es otro 0 y no hay punto
            if( numberString === '0' && number.includes('.') ) {
                return setNumber(number + numberString)
            }

            // Evaluar si es diferente de 0, no hay punto, y es el primer número
            if( numberString !== '0' && !number.includes('.') ) {
                return setNumber(numberString)
            }

            // Evitar 000000
            if ( numberString === '0' && !number.includes('.')) return
        }

        return setNumber( number + numberString)
    }

    const setLastNumber = () => {

        if(number.endsWith('.')) {
            setPreviusNumber( number.slice(0,-1) )
        } else {
            setPreviusNumber( number )
        }

        setNumber('0')
    }

    const divideOperation = () => {
        setLastNumber()
        lastOperation.current = Operators.divide
    }

    const multiplyOperation = () => {
        setLastNumber()
        lastOperation.current = Operators.multiply
    }

    const subtractOperation = () => {
        setLastNumber()
        lastOperation.current = Operators.subtract
    }

    const addOperation = () => {
        setLastNumber()
        lastOperation.current = Operators.add
    }

    return {
        // Properties
        number,
        previusNumber,

        // Methods
        buildNumber,
        toggleSign,
        deleteLast,
        clean,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
    }
}
