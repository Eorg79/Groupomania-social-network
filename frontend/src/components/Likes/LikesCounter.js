import React,  { useState, useEffect } from "react";
import styled from "styled-components";
import { Heart, HeartFill } from '@styled-icons/bootstrap'

const LikesCounter = () => {
    
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        console.log(`liké ${count} fois`);
    })

    return ( 
        <div className="heart icon">
            <button className="btn" onClick={() => setCount(count + 1)}> {count} likes </button>
        </div>

     );
}

export default LikesCounter;