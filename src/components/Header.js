import React from "react"
import Link from "gatsby-link"
import { FormattedMessage } from "react-intl"

const Header = props => {
	const links = props.langs.map (
		lang =>
			lang.selected ? (
				<span className="not-selected" key={lang.langKey}>
					<FormattedMessage id={`lang_name_${lang.langKey}`} />
				</span>
			) : (
				<Link
					to={`/${lang.langKey}`}
					key={lang.langKey}
					className={`${lang.selected ? "selected" : ""}`}
				>
					<FormattedMessage id={`lang_name_${lang.langKey}`} />
				</Link>
			)
	)

	return (
		<div className="header-top">
			<div className="header-language site-width">
				<i className="fa fa-globe" /> {links}
			</div>
		</div>
	)
}

export default Header
