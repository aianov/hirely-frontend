import { IconWithSize } from '@/shared/utils/globalTypes'

export const PrivacySettingsIcon = ({ size = 28 }: IconWithSize) => {
	return (
		<svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width={size} height={size} rx="8" fill="#0074DF" />
			<path d="M19.25 11H18.375V9.28571C18.375 6.92 16.415 5 14 5C11.585 5 9.625 6.92 9.625 9.28571V11H8.75C7.7875 11 7 11.7714 7 12.7143V21.2857C7 22.2286 7.7875 23 8.75 23H19.25C20.2125 23 21 22.2286 21 21.2857V12.7143C21 11.7714 20.2125 11 19.25 11ZM14 18.7143C13.0375 18.7143 12.25 17.9429 12.25 17C12.25 16.0571 13.0375 15.2857 14 15.2857C14.9625 15.2857 15.75 16.0571 15.75 17C15.75 17.9429 14.9625 18.7143 14 18.7143ZM16.7125 11H11.2875V9.28571C11.2875 7.82 12.5037 6.62857 14 6.62857C15.4963 6.62857 16.7125 7.82 16.7125 9.28571V11Z" fill="white" />
		</svg>
	)
}