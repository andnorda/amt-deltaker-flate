import { CaretRightCircleFillIcon } from '@navikt/aksel-icons'
import { BodyLong, Detail } from '@navikt/ds-react'
import { Vedtak } from '../../model/deltakerHistorikk'
import { formatDate, formatDateWithMonthName } from '../../utils/utils'
import { DeltakelseInnholdListe } from '../DeltakelseInnholdListe'
import { HistorikkElement } from './HistorikkElement'

interface Props {
  endringsVedtak: Vedtak
}

export const HistorikkVedtak = ({ endringsVedtak }: Props) => {
  const {
    fattet,
    fattetAvNav,
    opprettet,
    opprettetAv,
    opprettetAvEnhet,
    deltakelsesinnhold,
    bakgrunnsinformasjon
  } = endringsVedtak

  return (
    <HistorikkElement
      tittel={`Påmelding ${formatDateWithMonthName(fattet)}`}
      icon={<CaretRightCircleFillIcon color="var(--a-limegreen-800)" />}
    >
      <BodyLong size="small" weight="semibold">
        Dette er innholdet
      </BodyLong>
      <BodyLong size="small">{deltakelsesinnhold.ledetekst}</BodyLong>
      <DeltakelseInnholdListe
        deltakelsesinnhold={deltakelsesinnhold}
        className="-mt-3 -mb-1"
      />

      {bakgrunnsinformasjon && bakgrunnsinformasjon.length > 0 && (
        <>
          <BodyLong size="small" weight="semibold" className="mt-2">
            Bakgrunnsinfo
          </BodyLong>
          <BodyLong size="small">{bakgrunnsinformasjon}</BodyLong>
        </>
      )}

      <Detail className="mt-1" textColor="subtle">
        {fattetAvNav
          ? `Meldt på av ${opprettetAv} ${opprettetAvEnhet} ${formatDate(fattet)}.`
          : `Utkast delt ${formatDate(opprettet)} av ${opprettetAv} ${opprettetAvEnhet}. Du godkjente utkastet ${formatDate(fattet)}.`}
      </Detail>
    </HistorikkElement>
  )
}
