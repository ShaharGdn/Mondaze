import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { addGroup, getCmdAddGroup, getCmdAddPulse, getCmdRemoveGroup, getCmdRemovePulse, getCmdUpdateGroup, getCmdUpdatePulse, loadBoard, updatePulse } from '../store/actions/selected-board.actions'
import { getCmdAddBoard, getCmdUpdateBoard, getCmdRemoveBoard } from '../store/actions/board.actions'

import { GroupList } from '../cmps/group/GroupList'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActionsBar } from '../cmps/BoardActionsBar'
import { SidePanel } from '../cmps/SidePanel'
import { GroupListKanban } from '../cmps/Kanban/GroupListKanban'
import { boardService } from '../services/board'
import { socketService, SOCKET_EVENT_ADD_PULSE, SOCKET_EVENT_UPDATE_PULSE, SOCKET_EVENT_REMOVE_PULSE, SOCKET_EVENT_ADD_GROUP, SOCKET_EVENT_UPDATE_GROUP, SOCKET_EVENT_REMOVE_GROUP, SOCKET_EVENT_ADD_BOARD, SOCKET_EVENT_REMOVE_BOARD, SOCKET_EVENT_UPDATE_BOARD } from '../services/socket.service'

export function BoardDetails() {
  const { boardId } = useParams()
  const board = useSelector(storeState => storeState.selectedBoardModule.board)

  const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
  const [groupBy, setGroupBy] = useState('status')
  const [displayType, setDisplayType] = useState('main')
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [selectedPulse, setSelectedPulse] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    loadBoard(boardId, filterBy)
    setSelectedPulse(selectedPulse)

    return () => {
      setSelectedPulse(null)
    }
  }, [boardId, displayType, selectedPulse, filterBy])

  useEffect(() => {
    loadBoard(boardId, filterBy)

    // board sockets
    socketService.on(SOCKET_EVENT_ADD_BOARD, board => {
      dispatch(getCmdAddBoard(board))
    })
    socketService.on(SOCKET_EVENT_UPDATE_BOARD, board => {
      dispatch(getCmdUpdateBoard(board))
    })
    socketService.on(SOCKET_EVENT_REMOVE_BOARD, boardId => {
      dispatch(getCmdRemoveBoard(boardId))
    })

    // group sockets
    socketService.on(SOCKET_EVENT_ADD_GROUP, data => {
      dispatch(getCmdAddGroup(data.group, data.position))
    })
    socketService.on(SOCKET_EVENT_UPDATE_GROUP, data => {
      dispatch(getCmdUpdateGroup(data.group))
    })
    socketService.on(SOCKET_EVENT_REMOVE_GROUP, groupId => {
      dispatch(getCmdRemoveGroup(groupId))
    })

    // pulse sockets
    socketService.on(SOCKET_EVENT_ADD_PULSE, data => {
      dispatch(getCmdAddPulse(data.groupId, data.pulse))
    })
    socketService.on(SOCKET_EVENT_UPDATE_PULSE, data => {
      dispatch(getCmdUpdatePulse(data.groupId, data.pulseToUpdate))
      const updatedPulse = { groupId: data.groupId, pulse: data.pulseToUpdate }
      setSelectedPulse(updatedPulse)
    })
    socketService.on(SOCKET_EVENT_REMOVE_PULSE, data => {
      dispatch(getCmdRemovePulse(data.groupId, data.pulseId))
    })

    return () => {
      setSelectedPulse(null)
      socketService.off(SOCKET_EVENT_ADD_PULSE)
      socketService.off(SOCKET_EVENT_UPDATE_PULSE)
      socketService.off(SOCKET_EVENT_REMOVE_PULSE)
      socketService.off(SOCKET_EVENT_ADD_GROUP)
      socketService.off(SOCKET_EVENT_UPDATE_GROUP)
      socketService.off(SOCKET_EVENT_REMOVE_GROUP)
    }
  }, [boardId, selectedPulse])

  async function onAddGroup(position = 'start') {
    try {
      await addGroup(boardId, position)
      showSuccessMsg(`Group added`)
    } catch (err) {
      showErrorMsg('Cannot add group')
    }
  }

  async function onUpdatePulse(groupId, pulseToUpdate) {
    try {
      const updatedPulse = await updatePulse(board._id, groupId, pulseToUpdate)
      setSelectedPulse({ pulse: updatedPulse, groupId })
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
                <BoardActionsBar
                  board={board}
                  setDisplayType={setDisplayType}
                  displayType={displayType}
                  setGroupBy={setGroupBy}
                  filterBy={filterBy}
                  setFilterBy={setFilterBy} />
              </div>
            </section>
            {displayType === 'kanban' ?
              <GroupListKanban
                groups={board.groups}
                board={board}
                setSidePanelOpen={setSidePanelOpen}
                setSelectedPulse={setSelectedPulse}
                groupBy={groupBy} />
              :
              <GroupList
                groups={board.groups}
                board={board}
                setSidePanelOpen={setSidePanelOpen}
                setSelectedPulse={setSelectedPulse} />}
            {displayType !== "kanban" &&
              <button className="add-group-btn" onClick={() => onAddGroup("end")}>
                <i className="fa-regular fa-plus fa-lg"></i>Add new group
              </button>}
          </div>}
        </section>
      </main>
      {selectedPulse &&
        <SidePanel
          sidePanelOpen={sidePanelOpen}
          selectedPulse={selectedPulse}
          onUpdatePulse={onUpdatePulse}
          setSidePanelOpen={setSidePanelOpen} />}
    </>
  )
}