import { IconWithSize } from '@/shared/utils/globalTypes'

export const CopyMsgIcon = ({ size = 12, color = 'white' }: IconWithSize) => {
   return (
      <svg
         width={size}
         height={size}
         viewBox="0 0 10 12"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M2.34003 0.577706L2.33982 0.577734C1.76976 0.654687 1.38704 0.806179 1.09656 1.09787L1.09632 1.09811C0.805158 1.39008 0.65381 1.77525 0.577267 2.34805L0.577251 2.34817C0.501027 2.91752 0.5 3.65812 0.5 4.65532V7.89888C0.5 8.17456 0.573576 8.43295 0.702072 8.6553C0.700082 8.41734 0.700082 8.18143 0.700083 7.96511V7.95166V5.16814L0.700083 5.1399C0.70007 4.45087 0.700058 3.80946 0.770039 3.28519L0.770071 3.28495C0.847963 2.70352 1.03266 2.07594 1.54864 1.55786C2.06496 1.03942 2.69127 0.853763 3.27083 0.775178L3.27156 0.775079C3.79375 0.705058 4.43253 0.70507 5.1192 0.705084L5.14758 0.705084H6.85325L6.8815 0.705084C7.11451 0.705079 7.34192 0.705075 7.56113 0.707812C7.33117 0.572254 7.06861 0.500201 6.80047 0.5L2.34003 0.577706ZM2.34003 0.577706C2.90614 0.501051 3.64351 0.5 4.63699 0.5H6.80034L2.34003 0.577706Z" stroke={color} />
         <path d="M2.8231 2.83133L2.82331 2.83112C2.94918 2.70465 3.13144 2.61342 3.51124 2.56214C3.90566 2.50888 4.43152 2.50781 5.20022 2.50781H6.80033C7.56874 2.50781 8.09462 2.50888 8.4892 2.56214C8.86919 2.61343 9.05183 2.7047 9.17801 2.83133L9.53219 2.4784L9.17801 2.83133C9.30432 2.95809 9.39551 3.142 9.44663 3.52437C9.49964 3.92097 9.50056 4.44935 9.50056 5.22081V7.89878C9.50056 8.67012 9.4995 9.19856 9.44643 9.59514C9.39528 9.97736 9.30413 10.1614 9.17801 10.2883C9.05183 10.4149 8.86919 10.5062 8.4892 10.5574C8.09462 10.6107 7.56874 10.6118 6.80033 10.6118H5.20022C4.43181 10.6118 3.90594 10.6107 3.51144 10.5574C3.1315 10.5062 2.94914 10.4149 2.82331 10.2885L2.8231 10.2883C2.6967 10.1614 2.60541 9.97739 2.55419 9.59507C2.50105 9.19853 2.5 8.67014 2.5 7.89878V5.22081C2.5 4.44945 2.50105 3.92106 2.55419 3.52452C2.60541 3.1422 2.6967 2.95818 2.8231 2.83133Z" stroke={color} />
      </svg>
   )
}