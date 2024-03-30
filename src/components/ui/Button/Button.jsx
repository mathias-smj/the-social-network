import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn.js';

const Button = (label, color , size, className, ...restOfProps) => {

  const buttonStyle = cva('flex center text-l font-bold rounded-full', {
      variants : {
        color: {
          red: 'bg-red-500 hover:bg-red-600',
          blue: 'bg-blue-500 hover:bg-blue-600',
        },
        size: {
          small: 'px-2 py-1',
          normal: 'px-4 py-2',
          big: 'px-5 py-3',
        }
      },
      defaultVariants: {
        color: 'blue',
        size: 'normal',
      },
    }
  );

 return (
   <button className={cn(buttonStyle({color: color, size: size}), className)} {...restOfProps}>
       <span className={clsx(
         color === 'blue' ? 'text-white': 'text-yellow-200'
       )}>{label}</span>
   </button>
 )
};
export default Button;