import { useState } from "react"


export const useCalculator = () => {
  
    const [number, setNumber] = useState('0')

    const deleteLast = () => {
        if( number.length === 1 || (number.length === 2 && number.includes('-'))) {
            return setNumber('0')
        }

        setNumber(number.slice(0,-1))
    }
    
    const clean = () => {
        setNumber('0')
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

    return {
        // Properties
        number,

        // Methods
        buildNumber,
        toggleSign,
        deleteLast,
        clean
    }
}
