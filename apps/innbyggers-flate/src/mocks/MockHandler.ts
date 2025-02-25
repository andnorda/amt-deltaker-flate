import dayjs from 'dayjs'
import {
  DeltakerStatusType,
  EMDASH,
  Forslag,
  ForslagEndringAarsakType,
  ForslagEndringType,
  ForslagStatusType,
  HistorikkType,
  INNHOLD_TYPE_ANNET,
  Tiltakstype,
  createHistorikk
} from 'deltaker-flate-common'
import { HttpResponse } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { DeltakerResponse } from '../api/data/deltaker.ts'

const harVedtak = (statusType: DeltakerStatusType) => {
  return (
    statusType !== DeltakerStatusType.KLADD &&
    statusType !== DeltakerStatusType.UTKAST_TIL_PAMELDING &&
    statusType !== DeltakerStatusType.AVBRUTT_UTKAST
  )
}

export const createDeltaker = (
  statusType: DeltakerStatusType
): DeltakerResponse => {
  const yesterday = dayjs().subtract(1, 'day')

  return {
    deltakerId: uuidv4(),
    deltakerliste: {
      deltakerlisteId: '450e0f37-c4bb-4611-ac66-f725e05bad3e',
      deltakerlisteNavn: 'Testliste',
      tiltakstype: Tiltakstype.ARBFORB,
      arrangorNavn: 'Den Beste Arrangøren AS',
      oppstartstype: 'løpende',
      startdato: '2022-10-28',
      sluttdato: '2027-12-20'
    },
    status: {
      id: '5ac4076b-7b09-4883-9db1-bc181bd8d4f8',
      type: statusType,
      aarsak: null,
      gyldigFra: yesterday.toDate(),
      gyldigTil: null,
      opprettet: yesterday.toDate()
    },
    startdato: EMDASH,
    sluttdato: EMDASH,
    dagerPerUke: 1,
    deltakelsesprosent: 10,
    bakgrunnsinformasjon: null,
    deltakelsesinnhold: {
      ledetekst:
        'Du får tett oppfølging og støtte av en veileder. Sammen kartlegger dere hvordan din kompetanse, interesser og ferdigheter påvirker muligheten din til å jobbe.',
      innhold: [
        {
          tekst: 'Støtte til jobbsøking',
          innholdskode: 'type1',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst: 'Karriereveiledning',
          innholdskode: 'type2',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst:
            'Kartlegge hvordan helsen din påvirker muligheten din til å jobbe',
          innholdskode: 'type3',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst:
            'Kartlegge hvilken støtte og tilpasning du trenger på arbeidsplassen',
          innholdskode: 'type4',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst: 'Kartlegge dine forventninger til å jobbe',
          innholdskode: 'type5',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst: 'Veiledning i sosial mestring',
          innholdskode: 'type6',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst: 'Hjelp til å tilpasse arbeidsoppgaver og arbeidsplassen',
          innholdskode: 'type7',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst: 'Veiledning til arbeidsgiver',
          innholdskode: 'type8',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst: 'Oppfølging på arbeidsplassen',
          innholdskode: 'type9',
          valgt: true,
          beskrivelse: null
        },
        {
          tekst: 'Arbeidspraksis',
          innholdskode: 'type10',
          valgt: false,
          beskrivelse: null
        },
        {
          tekst: 'Annet',
          innholdskode: INNHOLD_TYPE_ANNET,
          valgt: true,
          beskrivelse: 'Beskrivelse av annet mål'
        }
      ]
    },
    vedtaksinformasjon: {
      fattet: harVedtak(statusType) ? yesterday.toString() : null,
      fattetAvNav: false,
      opprettet: yesterday.toString(),
      opprettetAv: 'Navn Navnesen',
      sistEndret: dayjs().toString(),
      sistEndretAv: 'Navn Navnesen',
      sistEndretAvEnhet: 'NAV Fredrikstad'
    },
    adresseDelesMedArrangor: true,
    forslag: []
  }
}

export class MockHandler {
  deltaker: DeltakerResponse | null = null
  deltakerIdNotAllowedToDelete = 'b21654fe-f0e6-4be1-84b5-da72ad6a4c0c'
  statusType = DeltakerStatusType.UTKAST_TIL_PAMELDING

  getDeltaker() {
    this.deltaker = createDeltaker(this.statusType)
    return HttpResponse.json(this.deltaker)
  }

  godkjennUtkast() {
    const oppdatertPamelding = this.deltaker
    if (oppdatertPamelding) {
      oppdatertPamelding.status.type = DeltakerStatusType.VENTER_PA_OPPSTART
      if (oppdatertPamelding.vedtaksinformasjon) {
        oppdatertPamelding.vedtaksinformasjon.fattet = dayjs().toString()
      }
      this.deltaker = oppdatertPamelding
      return HttpResponse.json(oppdatertPamelding)
    }
    return HttpResponse.json(this.deltaker)
  }

  setStatus(status: DeltakerStatusType) {
    this.statusType = status
    const oppdatertPamelding = this.deltaker

    if (oppdatertPamelding) {
      if (harVedtak(status) && oppdatertPamelding.vedtaksinformasjon) {
        oppdatertPamelding.vedtaksinformasjon.fattet = dayjs()
          .subtract(2, 'day')
          .toString()
      } else if (oppdatertPamelding.vedtaksinformasjon) {
        oppdatertPamelding.vedtaksinformasjon.fattet = null
      }
      if (oppdatertPamelding.vedtaksinformasjon) {
        if (harVedtak(status)) {
          oppdatertPamelding.vedtaksinformasjon.fattet = dayjs()
            .subtract(2, 'day')
            .toString()
        } else {
          oppdatertPamelding.vedtaksinformasjon.fattet = null
        }
      }
      oppdatertPamelding.status.type = status
      oppdatertPamelding.startdato = this.getStartdato(status)
      oppdatertPamelding.sluttdato = this.getSluttdato(status)
      oppdatertPamelding.forslag = this.getForslag()
      this.deltaker = oppdatertPamelding
      return HttpResponse.json(oppdatertPamelding)
    }
    return HttpResponse.json(this.deltaker)
  }

  getStartdato(nyStatus: DeltakerStatusType): string {
    if (
      nyStatus === DeltakerStatusType.DELTAR ||
      nyStatus === DeltakerStatusType.HAR_SLUTTET
    ) {
      const passertDato = new Date()
      passertDato.setDate(passertDato.getDate() - 15)
      return dayjs(passertDato).format('YYYY-MM-DD')
    }
    return EMDASH
  }

  getSluttdato(nyStatus: DeltakerStatusType): string {
    if (nyStatus === DeltakerStatusType.DELTAR) {
      const fremtidigDato = new Date()
      fremtidigDato.setDate(fremtidigDato.getDate() + 10)
      return dayjs(fremtidigDato).format('YYYY-MM-DD')
    }
    if (nyStatus === DeltakerStatusType.HAR_SLUTTET) {
      const passertDato = new Date()
      passertDato.setDate(passertDato.getDate() - 10)
      return dayjs(passertDato).format('YYYY-MM-DD')
    }
    return EMDASH
  }

  getForslag(): Forslag[] {
    if (this.statusType === DeltakerStatusType.DELTAR) {
      const fremtidigDato = new Date()
      fremtidigDato.setDate(fremtidigDato.getDate() + 12)
      const sluttdato = dayjs(fremtidigDato).format('YYYY-MM-DD')
      const forslag: Forslag = {
        id: uuidv4(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse:
          'Vi har kommet i gang, men ser at det er hensiktsmessig ' +
          'å fortsette tett oppfølging nå når han er i gang med å kontakte de riktige arbeidsgiverne. ' +
          'nå er det totalt sett to hundre tegn. Ja, det er det..',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.ForlengDeltakelse,
          sluttdato: dayjs(sluttdato).toDate()
        },
        status: {
          type: ForslagStatusType.VenterPaSvar
        }
      }
      const forslagAvslutt: Forslag = {
        id: uuidv4(),
        type: HistorikkType.Forslag,
        opprettet: dayjs().toDate(),
        begrunnelse: 'Må avslutte deltakelsen',
        arrangorNavn: 'Muligheter As',
        endring: {
          type: ForslagEndringType.AvsluttDeltakelse,
          sluttdato: dayjs(sluttdato).toDate(),
          aarsak: {
            type: ForslagEndringAarsakType.Syk
          }
        },
        status: {
          type: ForslagStatusType.VenterPaSvar
        }
      }
      return [forslag, forslagAvslutt]
    }
    if (this.statusType === DeltakerStatusType.VENTER_PA_OPPSTART) {
      const forslagIkkeAktuell: Forslag = {
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
          type: ForslagStatusType.VenterPaSvar
        }
      }
      return [forslagIkkeAktuell]
    }
    return []
  }

  getHistorikk() {
    return HttpResponse.json(createHistorikk())
  }
}
