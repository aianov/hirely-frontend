import { BackArrowLeftIcon } from '@/assets/icons/Ui/BackArrowLeftIcon'
import { DeleteIcon } from '@/assets/icons/Ui/DeleteIcon'
import { MainText } from '@/shared/ui/Theme/MainText'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import { isMobile } from '@/shared/utils/someFunctions'
import { profileStore } from '@/stores/profile-store/profile-store'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { themeStore } from '@/stores/theme/theme-store'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import s from './GoalsPlansSettings.module.scss'

export const GoalsPlansSettings = observer(() => {
   const { currentTheme } = themeStore
   const { profile: { more } } = profileStore
   const {
      isGoalEditing,
      isPlanEditing,
      setIsGoalEdition,
      setIsPlanEditing,
      goalsInEditMode,
      goalsInEditModeErr,
      plansInEditMode,
      updateGoals,
      updatePlans,
      addNewGoal,
      addNewPlan,
      clearGoals,
      clearPlans,
      deleteGoal,
      plansInEditModeErr,
      deletePlan,
      savePlans,
      saveGoals,
      setIsMobileAside
   } = settingsStore

   const noGoals = more?.goals?.length == 0
   const noPlans = more?.plans?.length == 0

   return (
      <div className={s.main}>
         <div className='privacy-settings-top'>
            {isMobile() && (
               <button
                  onClick={() => setIsMobileAside(false)}
                  className={'backbtn'}
               >
                  <BackArrowLeftIcon width={20} color={currentTheme.textColor.color} />
                  <MainText>Назад</MainText>
               </button>
            )}
            <span>Мои цели | планы</span>
         </div>
         <div className={s.select}>
            {/* ЦЕЛИ */}
            <div>
               <div className={s.goals} style={currentTheme.btnsTheme}>

                  {/* ЕСЛИ У ЧЕЛА ЕЩЕ НЕТУ ЦЕЛЕЙ. В else если цели есть */}
                  {noGoals && !isGoalEditing ? (
                     <div className={s.nogoals}>
                        <span style={currentTheme.secondTextColor}>Опишите цель, чтобы стать более целеустремленным 😎</span>
                        <button
                           className={s.addgoalbtn}
                           style={{
                              border: `1px dotted ${currentTheme.secondTextColor.color}`,
                              color: currentTheme.secondTextColor.color
                           }}
                           onClick={() => setIsGoalEdition(true)}
                        >+</button>
                     </div>
                  ) : !isGoalEditing && (
                     <div className={s.goalslist}>
                        <div className={s.top}>
                           <span className={s.title} style={currentTheme.textColor}>Мои цели:</span>
                        </div>

                        {more?.goals?.map((goal, ind) => {
                           return (
                              <div key={ind} className={s.goal}>
                                 <span className={s.createdAt} style={currentTheme.secondTextColor}>{dateFormatter(goal?.createdAt, 'HH:mm DD.MM.YYYY')}</span>
                                 <span className={s.text} style={currentTheme.textColor}>{goal?.do}</span>
                                 <span className={s.to} style={currentTheme.secondTextColor}>Выполнить до: {dateFormatter(goal?.to, 'DD.MM.YYYY')}</span>
                              </div>
                           )
                        })}

                        <div className={s.bot}>
                           <button onClick={() => setIsGoalEdition(true)} className={s.editbtn}>Редактировать</button>
                        </div>

                     </div>
                  )}

                  {/* РЕДАКТИРОВАНИЕ ЦЕЛЕЙ */}
                  {isGoalEditing && <>
                     <div className={s.top}>
                        <span style={currentTheme.secondTextColor}>{noGoals ? 'Создание' : 'Редактирование'} целей</span>
                     </div>

                     <div className={s.mid}>
                        {goalsInEditMode.map((g, i) => {
                           console.log(g.to)
                           return (
                              <div className={s.goaledit} key={g.id}>
                                 <div className={s.maininpdiv}>
                                    <div className={s.inpdiv}>
                                       <textarea
                                          value={g.do}
                                          onChange={e => settingsStore.updateGoals('do', e.target.value, i)}
                                          style={{
                                             background: currentTheme.bgTheme.background,
                                             border: currentTheme.bgTheme.border
                                          }}
                                          className={s.goalinp}
                                          maxLength={100}
                                       />
                                       <span
                                          className={s.limit}
                                          style={{
                                             color: g.do.length < 70 ? 'white' : (g.do.length > 70 && g.do.length <= 90) ? 'orange' : g.do.length > 90 ? 'red' : 'white'
                                          }}
                                       >
                                          {100 - g.do.length}
                                       </span>
                                    </div>
                                    {goalsInEditModeErr[i].doErr && <span className={s.errtext}>{goalsInEditModeErr[i].doErr}</span>}
                                 </div>

                                 <div className={s.bottom}>
                                    <div className={s.bottomcontainer}>
                                       <span className={s.datetext} style={currentTheme.secondTextColor}>Выполнить до:</span>
                                       <DatePicker
                                          style={{ height: '32.5px' }}
                                          format={'DD.MM.YYYY'}
                                          value={g.to ? dayjs(g.to) : null}
                                          onChange={(date) => {
                                             if (date && date.isValid()) updateGoals('to', date.format('YYYY-MM-DD'), i)
                                             else updateGoals('to', null, i)
                                          }}
                                          className={s.date}
                                       />
                                       <button
                                          className={s.deletegoal}
                                          onClick={() => deleteGoal(g.id)}
                                       >
                                          <DeleteIcon color={currentTheme.secondTextColor.color} />
                                       </button>
                                    </div>
                                    {goalsInEditModeErr[i].toErr && <span className={s.errtext}>{goalsInEditModeErr[i].toErr}</span>}
                                 </div>
                              </div>
                           )
                        })}
                     </div>

                     {!(goalsInEditMode.length >= 3) && (
                        <div className={s.add}>
                           <button
                              onClick={addNewGoal}
                              style={currentTheme.secondTextColor}
                           >
                              Добавить цель
                           </button>
                        </div>
                     )}

                     <div className={s.bot}>
                        <button
                           onClick={() => saveGoals()}
                           className={s.savebtn}
                        >
                           Сохранить
                        </button>
                        <button
                           onClick={clearGoals}
                           className={s.clearbtn}
                        >
                           Сбросить
                        </button>
                     </div>
                  </>}
               </div>
            </div>

            {/* ========================================== ПЛАНЫ ========================================== */}
            <div>
               <div className={s.plans} style={currentTheme.btnsTheme}>

                  {/* ЕСЛИ У ЧЕЛА ЕЩЕ НЕТУ ПЛАНОВ. В else если планы есть */}
                  {noPlans && !isPlanEditing ? (
                     <div className={s.noplans}>
                        <span style={currentTheme.secondTextColor}>Распишите планы, чтобы предсказать ваше будущее 🌄</span>
                        <button
                           className={s.addplanbtn}
                           style={{
                              border: `1px dotted ${currentTheme.secondTextColor.color}`,
                              color: currentTheme.secondTextColor.color
                           }}
                           onClick={() => setIsPlanEditing(true)}
                        >+</button>
                     </div>
                  ) : !isPlanEditing && (
                     <div className={s.planlist}>
                        <div className={s.top}>
                           <span className={s.title} style={currentTheme.textColor}>Мои планы:</span>
                        </div>

                        {more.plans.map((p, ind) => (
                           <div key={ind} className={s.plan}>
                              <div className={s.left}>
                                 <div
                                    className={s.counter}
                                    style={{
                                       background: currentTheme.bgTheme.background,
                                       border: currentTheme.bgTheme.border
                                    }}
                                 >
                                    <span>{ind + 1}</span>
                                 </div>
                              </div>
                              <div className={s.right}>
                                 <span>{p}</span>
                              </div>
                           </div>
                        ))}

                        <div className={s.bot}>
                           <button onClick={() => setIsPlanEditing(true)} className={s.editbtn}>Редактировать</button>
                        </div>

                     </div>
                  )}

                  {/* РЕДАКТИРОВАНИЕ ПЛАНОВ */}
                  {isPlanEditing && <>
                     <div className={s.top}>
                        <span className={s.title}>{noPlans ? 'Создание' : 'Редактирование'} планов</span>
                     </div>

                     <div className={s.mid}>
                        {plansInEditMode.map((p, i) => (
                           <div className={s.plan} key={i}>
                              <div
                                 className={s.left}
                              >
                                 <div
                                    style={{
                                       background: currentTheme.bgTheme.background,
                                       border: currentTheme.bgTheme.border
                                    }}
                                    className={s.counter}
                                 >
                                    <span>{i + 1}</span>
                                 </div>
                              </div>
                              <div className={s.right}>
                                 <div className={s.inpdiv}>
                                    <textarea
                                       value={p}
                                       onChange={e => updatePlans(i, e.target.value)}
                                       style={{
                                          background: currentTheme.bgTheme.background,
                                          border: currentTheme.bgTheme.border
                                       }}
                                       className={s.goalinp}
                                       maxLength={100}
                                    />
                                    <span
                                       className={s.limit}
                                       style={{
                                          color: p.length < 70 ? 'white' : (p.length > 70 && p.length <= 90) ? 'orange' : p.length > 90 ? 'red' : 'white'
                                       }}
                                    >
                                       {100 - p.length}
                                    </span>
                                    <button
                                       className={s.deletebtn}
                                       onClick={() => deletePlan(i)}
                                    >
                                       <DeleteIcon color={currentTheme.secondTextColor.color} size={18} />
                                    </button>
                                 </div>
                                 {plansInEditModeErr[i] && <span className={s.errtext}>{plansInEditModeErr[i]}</span>}
                              </div>
                           </div>
                        ))}
                     </div>

                     {!(plansInEditModeErr.length >= 6) && (
                        <div className={s.add}>
                           <button
                              style={currentTheme.secondTextColor}
                              onClick={() => addNewPlan()}
                           >
                              Добавить план
                           </button>
                        </div>
                     )}

                     <div className={s.bot}>
                        <button
                           className={s.savebtn}
                           onClick={() => savePlans()}
                        >
                           Сохранить
                        </button>
                        <button
                           onClick={clearPlans}
                           className={s.clearbtn}
                        >
                           Сбросить
                        </button>
                     </div>
                  </>}
               </div>
            </div>
         </div>
      </div>
   )
})