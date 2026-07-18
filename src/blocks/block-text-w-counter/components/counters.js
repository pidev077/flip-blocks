const Counters = (props) => {
    const { attributes } = props;
    const { counters, countersColor, labelColor, numberFontSize, labelFontSize } = attributes;

    const wrapperStyle = {};
    if (countersColor) wrapperStyle["--counter-number-color"] = countersColor;
    if (labelColor) wrapperStyle["--counter-label-color"] = labelColor;
    if (numberFontSize) wrapperStyle["--counter-number-font-size"] = `${numberFontSize}px`;
    if (labelFontSize) wrapperStyle["--counter-label-font-size"] = `${labelFontSize}px`;

    return(
        <div className='block-text-w-counters__counters' style={wrapperStyle}>
            { counters.map((counter, index) => (
                <div className='counter-item' key={index}>
                <h3 className='counter-number'>{counter.number}</h3>
                    <p>{counter.heading}</p>

                </div>
            ))}
        </div>
    )
}
export default Counters;
