import {    trigger, sequence, state, 
            stagger, animate, transition, 
            style, query, animateChild } 
from '@angular/animations';


export const rowsAnimation = 
trigger('rowsAnimation', [
  transition('void => *', [
    style({ height: '*', opacity: '0', transform: 'translatey(-10px)', 'box-shadow': 'none' }),
        sequence([
            animate(".25s ease", style({ height: '*', opacity: '.7', transform: 'translateX(0)', 'box-shadow': 'none'  })),
            animate(".25s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
    ])
]);