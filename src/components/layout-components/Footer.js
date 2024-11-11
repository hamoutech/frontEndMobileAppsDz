import React from 'react'
import { APP_NAME } from 'configs/AppConfig';
import { useTranslation } from 'react-i18next'

export default function Footer() {
	const { t } = useTranslation()
	return (
		<footer className="footer">
			<span>Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${APP_NAME}`}</span> {t('footer.rights')}</span>
			<div>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>{t('footer.terms')}</a>
				<span className="mx-2 text-muted"> | </span>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>{t('footer.privacy')}</a>
			</div>
		</footer>
	)
}

