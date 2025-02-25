import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import { v4 as uuidv4 } from 'uuid'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DeltakerStatusAarsakType } from '../model/deltaker'
import {
  ArrangorEndringsType,
  DeltakerHistorikkListe,
  EndringType
} from '../model/deltakerHistorikk'
import {
  ForslagEndringAarsakType,
  ForslagEndringType,
  ForslagStatusType,
  HistorikkType
} from '../model/forslag'

dayjs.locale(nb)
dayjs.extend(customParseFormat)

export const createHistorikk = (): DeltakerHistorikkListe => {
  return [
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreSluttarsak,
        aarsak: { type: DeltakerStatusAarsakType.IKKE_MOTT, beskrivelse: null },
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: uuidv4(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: null,
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.Sluttarsak,
          aarsak: {
            type: ForslagEndringAarsakType.IkkeMott
          }
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      id: uuidv4(),
      type: HistorikkType.Forslag,
      opprettet: dayjs().toDate(),
      begrunnelse: 'Har ikke møtt opp',
      arrangorNavn: 'Muligheter As',
      endring: {
        type: ForslagEndringType.IkkeAktuell,
        aarsak: {
          type: ForslagEndringAarsakType.IkkeMott
        }
      },
      status: {
        type: ForslagStatusType.Erstattet,
        erstattet: dayjs().toDate()
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreSluttdato,
        sluttdato: dayjs().toDate(),
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreStartdato,
        sluttdato: dayjs().toDate(),
        startdato: dayjs().toDate(),
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: uuidv4(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.Startdato,
          sluttdato: dayjs().add(4, 'month').toDate(),
          startdato: dayjs().add(1, 'month').toDate()
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.ReaktiverDeltakelse,
        reaktivertDato: dayjs().toDate(),
        begrunnelse:
          'Det var en feil at deltakelsen ble satt til ikke aktuell, dette er nå rettet.'
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.AvsluttDeltakelse,
        aarsak: {
          type: DeltakerStatusAarsakType.FATT_JOBB,
          beskrivelse: null
        },
        sluttdato: dayjs().toDate(),
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: uuidv4(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.AvsluttDeltakelse,
          sluttdato: dayjs().add(1, 'month').toDate(),
          aarsak: {
            type: ForslagEndringAarsakType.FattJobb
          }
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.IkkeAktuell,
        aarsak: {
          type: DeltakerStatusAarsakType.FATT_JOBB,
          beskrivelse: null
        },
        begrunnelse: null
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.ForlengDeltakelse,
        sluttdato: dayjs().add(1, 'month').toDate(),
        begrunnelse: 'Forlenger fordi vi må'
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: uuidv4(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.ForlengDeltakelse,
          sluttdato: dayjs().add(1, 'month').toDate()
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      id: uuidv4(),
      type: HistorikkType.Forslag,
      opprettet: dayjs().toDate(),
      begrunnelse: 'Trenger mer tid til hjelp',
      arrangorNavn: 'Muligheter As',
      endring: {
        type: ForslagEndringType.ForlengDeltakelse,
        sluttdato: dayjs().add(1, 'month').toDate()
      },
      status: {
        type: ForslagStatusType.Avvist,
        avvist: dayjs().toDate(),
        avvistAv: 'Navn Navnesen',
        avvistAvEnhet: 'Nav Fredrikstad',
        begrunnelseFraNav: 'Kan ikke forlenge så lenge'
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreDeltakelsesmengde,
        begrunnelse: 'Det er ok.',
        deltakelsesprosent: 80,
        dagerPerUke: 4
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: {
        id: uuidv4(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Trenger mer tid til hjelp',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.Deltakelsesmengde,
          deltakelsesprosent: 80,
          dagerPerUke: 4
        },
        status: {
          type: ForslagStatusType.Godkjent,
          godkjent: dayjs().toDate()
        }
      }
    },
    {
      type: HistorikkType.EndringFraArrangor,
      id: uuidv4(),
      opprettet: dayjs().toDate(),
      arrangorNavn: 'Muligheter AS',
      endring: {
        type: ArrangorEndringsType.LeggTilOppstartsdato,
        startdato: dayjs().toDate(),
        sluttdato: dayjs().add(10, 'months').toDate()
      }
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreBakgrunnsinformasjon,
        bakgrunnsinformasjon: ''
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Endring,
      endring: {
        type: EndringType.EndreInnhold,
        innhold: [
          {
            tekst: 'Støtte til jobbsøking',
            innholdskode: 'type1',
            valgt: true,
            beskrivelse: null
          },
          {
            tekst: 'Karriereveiledning',
            innholdskode: 'type2',
            valgt: false,
            beskrivelse: null
          }
        ]
      },
      endretAv: 'Navn Navnesen',
      endretAvEnhet: 'NAV Fredrikstad',
      endret: dayjs().subtract(2, 'day').toDate(),
      forslag: null
    },
    {
      type: HistorikkType.Vedtak,
      fattet: dayjs().subtract(10, 'days').toDate(),
      bakgrunnsinformasjon: 'Bakgrunnsinformasjon',
      fattetAvNav: true,
      deltakelsesinnhold: {
        ledetekst:
          'Du får tett oppfølging og støtte av en veileder. Sammen kartlegger dere hvordan din kompetanse, interesser og ferdigheter påvirker muligheten din til å jobbe.',
        innhold: [
          {
            tekst: 'Støtte til jobbsøking',
            innholdskode: 'type1',
            valgt: true,
            beskrivelse: null
          }
        ]
      },
      opprettetAv: 'Navn Navnesen',
      opprettetAvEnhet: 'NAV Fredrikstad',
      opprettet: dayjs().subtract(3, 'day').toDate()
    }
  ]
}
