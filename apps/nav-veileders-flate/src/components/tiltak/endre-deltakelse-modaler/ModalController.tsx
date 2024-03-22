import { EndreDeltakelseType } from '../../../api/data/endre-deltakelse-request.ts'
import { PameldingResponse } from '../../../api/data/pamelding.ts'
import { IkkeAktuellModal } from './IkkeAktuellModal.tsx'
import { ForlengDeltakelseModal } from './ForlengDeltakelseModal.tsx'
import { EndreOppstartsdatoModal } from './EndreOppstartsdatoModal.tsx'
import { EndreBakgrunnsinfoModal } from './EndreBakgrunnsinfoModal.tsx'
import { AvsluttDeltakelseModal } from './AvsluttDeltakelseModal.tsx'
import { EndreSluttdatoModal } from './EndreSluttdatoModal.tsx'
import { EndreSluttarsakModal } from './EndreSluttarsakModal.tsx'
import { EndreInnholdModal } from './EndreInnholdModal'
import {EndreDeltakelsesmengdeModal} from './EndreDeltakelsesmengdeModal.tsx'

interface ModalControllerProps {
  open: boolean
  pamelding: PameldingResponse
  endringsType: EndreDeltakelseType | null
  onClose: () => void
  onSuccess: (oppdatertPamelding: PameldingResponse | null) => void
}

export const ModalController = (props: ModalControllerProps) => {
  switch (props.endringsType) {
    case EndreDeltakelseType.IKKE_AKTUELL:
      return <IkkeAktuellModal {...props} />
    case EndreDeltakelseType.FORLENG_DELTAKELSE:
      return <ForlengDeltakelseModal {...props} />
    case EndreDeltakelseType.ENDRE_OPPSTARTSDATO:
      return <EndreOppstartsdatoModal {...props} />
    case EndreDeltakelseType.ENDRE_BAKGRUNNSINFO:
      return <EndreBakgrunnsinfoModal {...props} />
    case EndreDeltakelseType.ENDRE_INNHOLD:
      return <EndreInnholdModal {...props} />
    case EndreDeltakelseType.AVSLUTT_DELTAKELSE:
      return <AvsluttDeltakelseModal {...props} />
    case EndreDeltakelseType.ENDRE_SLUTTDATO:
      return <EndreSluttdatoModal {...props} />
    case EndreDeltakelseType.ENDRE_SLUTTARSAK:
      return <EndreSluttarsakModal {...props} />
    case EndreDeltakelseType.ENDRE_DELTAKELSESMENGDE:
      return <EndreDeltakelsesmengdeModal {...props} />
    default:
      return null
  }
}
