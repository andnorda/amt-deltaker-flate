import { z } from 'zod'
import {
  deltakelsesinnholdSchema,
  deltakerStatusAarsakSchema,
  innholdSchema,
  stringToDate
} from './deltaker'
import { forslagSchema, HistorikkType } from './forslag'

export enum EndringType {
  EndreStartdato = 'EndreStartdato',
  EndreSluttdato = 'EndreSluttdato',
  EndreDeltakelsesmengde = 'EndreDeltakelsesmengde',
  EndreBakgrunnsinformasjon = 'EndreBakgrunnsinformasjon',
  EndreInnhold = 'EndreInnhold',
  IkkeAktuell = 'IkkeAktuell',
  ForlengDeltakelse = 'ForlengDeltakelse',
  AvsluttDeltakelse = 'AvsluttDeltakelse',
  EndreSluttarsak = 'EndreSluttarsak',
  ReaktiverDeltakelse = 'ReaktiverDeltakelse'
}

export enum ArrangorEndringsType {
  LeggTilOppstartsdato = 'LeggTilOppstartsdato'
}

export const endreBakgrunnsinformasjonSchema = z.object({
  type: z.literal(EndringType.EndreBakgrunnsinformasjon),
  bakgrunnsinformasjon: z.string().nullable()
})

export const endreInnholdSchema = z.object({
  type: z.literal(EndringType.EndreInnhold),
  innhold: z.array(innholdSchema)
})

export const endreDeltakelsesmengdeSchema = z.object({
  type: z.literal(EndringType.EndreDeltakelsesmengde),
  deltakelsesprosent: z.number().nullable(),
  dagerPerUke: z.number().nullable(),
  begrunnelse: z.string().nullable()
})

export const endreStartdatoSchema = z.object({
  type: z.literal(EndringType.EndreStartdato),
  startdato: stringToDate,
  sluttdato: stringToDate,
  begrunnelse: z.string().nullable()
})

export const endreSluttdatoSchema = z.object({
  type: z.literal(EndringType.EndreSluttdato),
  sluttdato: stringToDate,
  begrunnelse: z.string().nullable()
})

export const forlengDeltakelseSchema = z.object({
  type: z.literal(EndringType.ForlengDeltakelse),
  sluttdato: stringToDate,
  begrunnelse: z.string().nullable()
})

export const ikkeAktuellSchema = z.object({
  type: z.literal(EndringType.IkkeAktuell),
  aarsak: deltakerStatusAarsakSchema,
  begrunnelse: z.string().nullable()
})

export const avsluttDeltakelseSchema = z.object({
  type: z.literal(EndringType.AvsluttDeltakelse),
  aarsak: deltakerStatusAarsakSchema,
  sluttdato: stringToDate,
  begrunnelse: z.string().nullable()
})

export const endreSluttarsakSchema = z.object({
  type: z.literal(EndringType.EndreSluttarsak),
  aarsak: deltakerStatusAarsakSchema,
  begrunnelse: z.string().nullable()
})

export const reaktiverDeltakelseSchema = z.object({
  type: z.literal(EndringType.ReaktiverDeltakelse),
  reaktivertDato: stringToDate,
  begrunnelse: z.string()
})

const endringSchema = z.discriminatedUnion('type', [
  endreBakgrunnsinformasjonSchema,
  endreInnholdSchema,
  endreDeltakelsesmengdeSchema,
  endreStartdatoSchema,
  endreSluttdatoSchema,
  forlengDeltakelseSchema,
  ikkeAktuellSchema,
  avsluttDeltakelseSchema,
  endreSluttarsakSchema,
  reaktiverDeltakelseSchema
])

const arrangorLeggTilOppstartSchema = z.object({
  type: z.literal(ArrangorEndringsType.LeggTilOppstartsdato),
  startdato: stringToDate,
  sluttdato: stringToDate
})

const arrangorEndringSchema = z.discriminatedUnion('type', [
  arrangorLeggTilOppstartSchema
])

export const vedtakSchema = z.object({
  type: z.literal(HistorikkType.Vedtak),
  fattet: stringToDate.nullable(),
  bakgrunnsinformasjon: z.string().nullable(),
  fattetAvNav: z.boolean(),
  deltakelsesinnhold: deltakelsesinnholdSchema,
  opprettetAv: z.string(),
  opprettetAvEnhet: z.string(),
  opprettet: stringToDate
})

export const deltakerEndringSchema = z.object({
  type: z.literal(HistorikkType.Endring),
  endring: endringSchema,
  endretAv: z.string(),
  endretAvEnhet: z.string(),
  endret: stringToDate,
  forslag: forslagSchema.nullable()
})

export const endringFraArrangorSchema = z.object({
  type: z.literal(HistorikkType.EndringFraArrangor),
  id: z.string().uuid(),
  opprettet: stringToDate,
  arrangorNavn: z.string(),
  endring: arrangorEndringSchema
})

export const deltakerHistorikkSchema = z.discriminatedUnion('type', [
  vedtakSchema,
  deltakerEndringSchema,
  forslagSchema,
  endringFraArrangorSchema
])

export const deltakerHistorikkListeSchema = z.array(deltakerHistorikkSchema)

export type Endring = z.infer<typeof endringSchema>
export type ArrangorEndring = z.infer<typeof arrangorEndringSchema>
export type DeltakerEndring = z.infer<typeof deltakerEndringSchema>
export type DeltakerEndringFraArrangor = z.infer<
  typeof endringFraArrangorSchema
>
export type Vedtak = z.infer<typeof vedtakSchema>
export type DeltakerHistorikk = z.infer<typeof deltakerHistorikkSchema>
export type DeltakerHistorikkListe = z.infer<
  typeof deltakerHistorikkListeSchema
>
