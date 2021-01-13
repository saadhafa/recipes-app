import {createPortal} from 'react-dom'

export function Modal({onClose,children,title,id}){

  return createPortal(<>
    <div key={id} className="modal fade show" role="dialog" style={{display:'block'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button tupe="button" aria-label='close' onClick={onClose} className="close"></button>
              <span aria-hidden="true">X</span>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
  </>,document.body)
}