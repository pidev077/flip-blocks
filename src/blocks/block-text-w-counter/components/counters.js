const Counters = (props) => {
    const { attributes } = props;
    const { counters, countersColor } = attributes;
    return(
        <div className='block-text-w-counters__counters'> 
            { counters.map((counter, index) => ( 
                <div className='counter-item' key={index}> 
                <h3 style={{color: countersColor}} className='counter-number'>{counter.number}</h3>
                    <p style={{color: countersColor}}>{counter.heading}</p>
                    
                </div>
            ))}
        </div> 
    )
}
export default Counters;