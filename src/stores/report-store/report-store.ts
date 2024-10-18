
import { makeAutoObservable } from "mobx"
import { mobxState } from 'mobx-toolbox'
import { ReportType } from './types'

class ReportStore {
	constructor() { makeAutoObservable(this) }

	// ========= STATES ============
	isReportingModal = mobxState(false)('isReportingModal')
	reportType = mobxState<ReportType | null>(null)('reportType')

}

export const reportStore = new ReportStore()