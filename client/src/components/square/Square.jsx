import React from 'react';
import './SquareStyle.scss';
import './SquareAdaptive.scss';

const Square = ({value, onClick, winner, index}) => {
  const styleBack = (winner, index) => {
    if (winner !== null) {                                    // проверка на наличие победителя
      if (winner[1].includes(index)) {                        // проверка на соответствие выигрышного индекса поля
        if (winner[0].role === 'cross')         // проверка на иконку поля
          return 'square winSquareX'
        else
          return 'square winSquareO';
      }
    }
    return 'square';
  }

  return (
    <div className={`${styleBack(winner, index)}`} onClick={onClick}>
      <div className='square-content'>
        {value && <img src={`/img/${value.role}.svg`} alt="" />} {/* !!! */}
      </div>
    </div>
  )
}

export default Square