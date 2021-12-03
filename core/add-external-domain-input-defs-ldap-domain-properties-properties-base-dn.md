# Base DN Schema

```txt
http://schema.nethserver.org/cluster/add-external-domain-input.json#/$defs/additional-properties-of-ldap/properties/base_dn
```

The LDAP base DN is probed automatically if the value is `null` or the property is missing

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                       |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [add-external-domain-input.json*](cluster/add-external-domain-input.json "open original schema") |

## base_dn Type

`string` ([Base DN](add-external-domain-input-defs-ldap-domain-properties-properties-base-dn.md))

## base_dn Constraints

**minimum length**: the minimum number of characters for this string is: `1`
