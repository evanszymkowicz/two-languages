import React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"

const ImageBoxRow = ({ boxes }) => {
	const boxLinks = boxes.map(box => (
		<div className="service" key={box.id}>
			<Link to={`/${box.node_locale}/${box.link}`} key={box.link}>
				{box.text}
			</Link>
			<div className="img">
				<Img sizes={box.image.sizes} />
			</div>
		</div>
	))

	return <div className="services">{boxLinks}</div>
}

export default ImageBoxRow
