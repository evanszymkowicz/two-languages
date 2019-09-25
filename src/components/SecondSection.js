import React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import ImageBoxRow from "./ImageBoxRow"

const SecondSection = props => {
	return (
		<div className="content site-width">
			<h2>{props.data.secondSectionTitle}</h2>
			<div
				className="text"
				dangerouslySetInnerHTML={{
					__html: props.data.secondSectionDescription.childMarkdownRemark.html,
				}}
			/>
			{props.data.secondSectionBoxes && (
				<ImageBoxRow boxes={props.data.secondSectionBoxes} />
			)}
		</div>
	)
}

export default SecondSection
