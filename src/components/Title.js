import React from 'react'
import StylesTitle from './styles/TitleStyles';

export default function Title({ title }) {
    return (
        <div className="row">
            <div className="col-md-12">
                <p style={StylesTitle.title}>
                    <span style={StylesTitle.span}>
                        {title}
                    </span>
                </p>
            </div>
        </div>
    )
}