import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGroup, loadBoard, updatePulse } from '../store/actions/selected-board.actions'

import { GroupList } from '../cmps/group/GroupList'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActionsBar } from '../cmps/BoardActionsBar'
import { SidePanel } from '../cmps/SidePanel'

export function BoardDetails() {
  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.selectedBoardModule.board)
  const [filterBy, setFilterBy] = useState()

  const [displayType, setDisplayType] = useState('main')
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [selectedPulse, setSelectedPulse] = useState(null)

  useEffect(() => {
    loadBoard(boardId)
    setSelectedPulse(selectedPulse)

    return () => {
      setSelectedPulse(null)
    }
  }, [boardId, displayType, selectedPulse])

  async function onAddGroup(position = 'start') {
    try {
      await addGroup(boardId, position)
      showSuccessMsg(`Group added`)
    } catch (err) {
      showErrorMsg('Cannot add group')
    }
  }

  function groupPulsesByStatus() {
    if (!board?.status) return

    const statuses = board.status

    const allPulses = board.groups.reduce((allPulses, group) => {
      return [...allPulses, ...group.pulses]
    }, [])

    const groupedPulses = statuses.map((status) => {
      const pulsesForStatus = allPulses.filter(pulse => pulse.status === status.id)

      // Only include the status if there are pulses associated with it
      if (pulsesForStatus.length > 0) {
        return {
          title: status.title,
          id: status.id,
          archivedAt: null,
          pulses: pulsesForStatus,
          style: { color: status.color },
        }
      }

      return null
    }).filter(group => group !== null)

    return groupedPulses
  }

  async function onUpdatePulse(groupId, pulseToUpdate) {
    try {
      await updatePulse(board._id, groupId, pulseToUpdate)
      showSuccessMsg('Pulse updated successfully')
    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot update pulse')
    }
  }

  return (
    <>
      <main>
        <section className="board-details main">
          {board && <div className="main-display">

            <section className='main-top-container'>
              <div className='top-sticky-wrapper'>
                <BoardHeader board={board} />
                <BoardActionsBar board={board} setDisplayType={setDisplayType} displayType={displayType} filterBy={filterBy} setFilterBy={setFilterBy} />
              </div>
            </section>
            <GroupList
              groups={displayType === 'kanban' ? groupPulsesByStatus()
                : board.groups} board={board} type={displayType} setSidePanelOpen={setSidePanelOpen} setSelectedPulse={setSelectedPulse} />
            {displayType !== 'kanban' && <button className="add-group-btn" onClick={() => onAddGroup("end")}>
              <i className="fa-regular fa-plus fa-lg"></i>Add new group
            </button>}
          </div>}
        </section>
      </main>
      {selectedPulse && <SidePanel sidePanelOpen={sidePanelOpen} selectedPulse={selectedPulse} onUpdatePulse={onUpdatePulse} setSidePanelOpen={setSidePanelOpen} />}
    </>
  )
}