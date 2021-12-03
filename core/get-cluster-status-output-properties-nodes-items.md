# Untitled object in get-cluster-status output Schema

```txt
http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                       |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [get-cluster-status-output.json*](cluster/get-cluster-status-output.json "open original schema") |

## items Type

`object` ([Details](get-cluster-status-output-properties-nodes-items.md))

# items Properties

| Property            | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                |
| :------------------ | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [id](#id)           | `integer` | Required | cannot be null | [get-cluster-status output](get-cluster-status-output-properties-nodes-items-properties-id.md "http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items/properties/id")                |
| [ui_name](#ui_name) | `string`  | Required | cannot be null | [get-cluster-status output](get-cluster-status-output-properties-nodes-items-properties-display-name.md "http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items/properties/ui_name") |
| [local](#local)     | `boolean` | Required | cannot be null | [get-cluster-status output](get-cluster-status-output-properties-nodes-items-properties-local.md "http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items/properties/local")          |
| [vpn](#vpn)         | `object`  | Required | cannot be null | [get-cluster-status output](get-cluster-status-output-properties-nodes-items-properties-vpn.md "http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items/properties/vpn")              |

## id

Node ID

`id`

*   is required

*   Type: `integer`

*   cannot be null

*   defined in: [get-cluster-status output](get-cluster-status-output-properties-nodes-items-properties-id.md "http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items/properties/id")

### id Type

`integer`

## ui_name



`ui_name`

*   is required

*   Type: `string` ([Display name](get-cluster-status-output-properties-nodes-items-properties-display-name.md))

*   cannot be null

*   defined in: [get-cluster-status output](get-cluster-status-output-properties-nodes-items-properties-display-name.md "http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items/properties/ui_name")

### ui_name Type

`string` ([Display name](get-cluster-status-output-properties-nodes-items-properties-display-name.md))

## local

Set to true if the action is running on the listed node.

`local`

*   is required

*   Type: `boolean`

*   cannot be null

*   defined in: [get-cluster-status output](get-cluster-status-output-properties-nodes-items-properties-local.md "http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items/properties/local")

### local Type

`boolean`

## vpn

WireGuard VPN details

`vpn`

*   is required

*   Type: `object` ([Details](get-cluster-status-output-properties-nodes-items-properties-vpn.md))

*   cannot be null

*   defined in: [get-cluster-status output](get-cluster-status-output-properties-nodes-items-properties-vpn.md "http://schema.nethserver.org/cluster/get-cluster-status-output.json#/properties/nodes/items/properties/vpn")

### vpn Type

`object` ([Details](get-cluster-status-output-properties-nodes-items-properties-vpn.md))
